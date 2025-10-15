
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log("🔍 Running pre-build self-healing check...");

// Verify firebase.json exists
const firebaseJsonPath = path.join(__dirname, '..', 'firebase.json');
if (!fs.existsSync(firebaseJsonPath)) {
  console.error("❌ firebase.json not found! Build may fail.");
  process.exit(1);
}

// Load firebase.json
const firebaseConfig = JSON.parse(fs.readFileSync(firebaseJsonPath, 'utf8'));

// Ensure hosting config exists
if (!firebaseConfig.hosting || !firebaseConfig.hosting.public) {
  console.warn("⚠️ Hosting config incomplete. Fixing...");
  firebaseConfig.hosting = firebaseConfig.hosting || {};
  firebaseConfig.hosting.public = "build";
  fs.writeFileSync(firebaseJsonPath, JSON.stringify(firebaseConfig, null, 2));
  console.log("✅ Hosting config fixed.");
}

// Simulate fetch step
console.log("✅ Fetch step simulated via prebuild hook.");

// Verify node_modules exists
const nodeModulesPath = path.join(__dirname, '..', 'node_modules');
if (!fs.existsSync(nodeModulesPath)) {
  console.log("📦 node_modules missing. Installing dependencies...");
  execSync('npm install', { stdio: 'inherit' });
  console.log("✅ Dependencies installed.");
}

// Backup current build for rollback
const buildPath = path.join(__dirname, '..', 'build');
const backupPath = path.join(__dirname, '..', 'build_backup');
if (fs.existsSync(buildPath)) {
  fs.rmSync(backupPath, { recursive: true, force: true });
  fs.renameSync(buildPath, backupPath);
  console.log("💾 Build backup created for rollback.");
}

console.log("✅ Pre-build self-healing check complete. Ready to build!");
