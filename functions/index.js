const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const cors = require('cors');

// Initialize Firebase Admin SDK
if (!admin.apps.length) {
  admin.initializeApp();
}
const db = admin.firestore();
const app = express();

// Automatically allow cross-origin requests
app.use(cors({ origin: true }));
app.use(express.json());

// List of UIDs that are granted permanent admin access, regardless of claims.
const ALLOWED_ADMINS = ["eiMBgcJ3KhWGesl8J78oYFHiquy2", "lzNhwweRAndUfVzCzrAEcXLSrcs1"];

/**
 * Express middleware that checks if a user is an admin.
 * It verifies the Firebase ID token and checks for a `superAdmin` claim
 * or if the UID is in the hardcoded `ALLOWED_ADMINS` list.
 */
async function authAdminMiddleware(req, res, next) {
  try {
    const idToken = req.headers.authorization?.split('Bearer ')[1] || req.body?.idToken;
    if (!idToken) {
      return res.status(401).json({ error: 'Missing ID token' });
    }

    const decoded = await admin.auth().verifyIdToken(idToken, true); // Check for revocation
    
    // Check for superAdmin claim or if UID is in the allowed list.
    if (decoded.superAdmin === true || ALLOWED_ADMINS.includes(decoded.uid)) {
      req.adminUid = decoded.uid;
      req.adminClaims = decoded;
      return next();
    }
    
    // Fallback: check the 'admins' collection if needed for other admins
    const adminDoc = await db.collection('admins').doc(decoded.uid).get();
    if (adminDoc.exists) {
      req.adminUid = decoded.uid;
      req.adminClaims = decoded;
      return next();
    }

    // If none of the checks pass, deny access.
    return res.status(403).json({ error: 'Not authorized as admin' });

  } catch (e) {
    console.error('Admin authentication error:', e.message);
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
}

// Define the GET endpoint to read collections
app.get('/', authAdminMiddleware, async (req, res) => {
  try {
    const collectionName = req.query.collection;
    if (!collectionName || typeof collectionName !== 'string') {
      return res.status(400).json({ error: '`collection` query parameter is required' });
    }
    
    const snap = await db.collection(collectionName).limit(1000).get();
    const docs = snap.docs.map(d => ({ id: d.id, ...d.data() }));

    // Log the admin read activity
    await db.collection('vsd_api_logs').add({
        type: 'admin_read',
        collection: collectionName,
        adminUid: req.adminUid,
        timestamp: admin.firestore.FieldValue.serverTimestamp(),
        count: docs.length
    });

    res.json({ ok: true, docs });
  } catch (e) {
    console.error('Admin Proxy GET Error:', e);
    res.status(500).json({ error: String(e) });
  }
});

// Define the POST endpoint for write, create, and delete operations
app.post('/', authAdminMiddleware, async (req, res) => {
  try {
    const { op, collection, docId, data } = req.body;
    if (!op || !collection) {
      return res.status(400).json({ error: '`op` and `collection` are required' });
    }

    let logData = {
        collection,
        docId: docId || null,
        adminUid: req.adminUid,
        timestamp: admin.firestore.FieldValue.serverTimestamp()
    };

    if (op === 'write') {
      if (!docId) return res.status(400).json({error: 'docId required for write op'});
      await db.collection(collection).doc(docId).set(data, { merge: true });
      await db.collection('vsd_api_logs').add({ ...logData, type: 'admin_write' });
      return res.json({ ok: true });
    }

    if (op === 'create') {
      const snap = await db.collection(collection).add(data);
      await db.collection('vsd_api_logs').add({ ...logData, type: 'admin_create', docId: snap.id });
      return res.json({ ok: true, id: snap.id });
    }

    if (op === 'delete') {
      if (!docId) return res.status(400).json({error: 'docId required for delete op'});
      await db.collection(collection).doc(docId).delete();
      await db.collection('vsd_api_logs').add({ ...logData, type: 'admin_delete' });
      return res.json({ ok: true });
    }

    return res.status(400).json({ error: 'Unsupported operation' });
  } catch (e) {
    console.error('Admin Proxy POST Error:', e);
    res.status(500).json({ error: String(e) });
  }
});

// Export the Express app as a Cloud Function
exports.adminProxy = functions.https.onRequest(app);
