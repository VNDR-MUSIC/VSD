{
  "entities": {
    "Admin": {
      "$schema": "http://json-schema.org/draft-07/schema#",
      "title": "Admin",
      "type": "object",
      "description": "Represents an administrator user. The document ID is the user's UID.",
      "properties": {
        "uid": { "type": "string", "description": "The Firebase Authentication User ID of the admin." },
        "addedAt": { "type": "string", "format": "date-time", "description": "ISO timestamp of when admin privileges were granted." }
      },
      "required": ["uid", "addedAt"]
    },
    "Account": {
      "$schema": "http://json-schema.org/draft-07/schema#",
      "title": "Account",
      "type": "object",
      "description": "Represents a user's account, linking Firebase Auth UID to their VSD balance and wallet.",
      "properties": {
        "uid": {
          "type": "string",
          "description": "The Firebase Authentication User ID."
        },
        "email": {
          "type": "string",
          "description": "The user's email address.",
          "format": "email"
        },
        "displayName": {
          "type": "string",
          "description": "The user's display name."
        },
        "photoURL": {
          "type": "string",
          "description": "URL of the user's profile picture.",
          "format": "uri"
        },
        "walletAddress": {
          "type": "string",
          "description": "The user's associated wallet address."
        },
        "vsdBalance": {
          "type": "number",
          "description": "The user's VSD token balance."
        },
        "status": {
          "type": "string",
          "description": "The status of the account (e.g., Active, Suspended).",
          "enum": ["Active", "Suspended"]
        },
        "joined": {
          "type": "string",
          "description": "ISO timestamp of when the user joined.",
          "format": "date-time"
        },
        "roles": {
          "type": "array",
          "description": "A list of roles assigned to the user (e.g., 'admin', 'advertiser').",
          "items": {
            "type": "string",
            "enum": ["admin", "advertiser", "user"]
          }
        }
      },
      "required": ["uid", "email", "walletAddress", "vsdBalance", "status", "joined", "roles"]
    },
    "Tenant": {
      "$schema": "http://json-schema.org/draft-07/schema#",
      "title": "Tenant",
      "type": "object",
      "description": "Represents an integrated partner project or website in the VSD ecosystem.",
      "properties": {
        "id": { "type": "string", "description": "Unique ID for the tenant." },
        "name": { "type": "string", "description": "Name of the tenant project." },
        "domain": { "type": "string", "description": "The tenant's primary domain." },
        "apiKey": { "type": "string", "description": "The generated API key for the tenant." },
        "status": { "type": "string", "enum": ["Active", "Inactive"], "description": "The status of the tenant." },
        "createdAt": { "type": "string", "format": "date-time", "description": "ISO timestamp of when the tenant was created." }
      },
      "required": ["id", "name", "domain", "apiKey", "status", "createdAt"]
    },
    "Transaction": {
      "$schema": "http://json-schema.org/draft-07/schema#",
      "title": "Transaction",
      "type": "object",
      "description": "Represents a single ledger activity within the VSD Network.",
      "properties": {
        "id": { "type": "string" },
        "type": { "type": "string", "enum": ["Mint (Stripe)", "Transfer", "Burn (Refund)", "API Spend", "Staking Reward", "Royalty Payout", "in", "out", "VSD Lite Transfer", "VSD Lite Exchange"] },
        "status": { "type": "string", "enum": ["Completed", "Pending", "Failed"] },
        "amount": { "type": "number", "description": "The transaction amount in VSD." },
        "date": { "type": "string", "format": "date-time" },
        "user": { "type": "string", "description": "Display name of the user involved." },
        "accountId": { "type": "string", "description": "The ID of the account involved in the transaction." },
        "from": { "type": "string", "description": "The sender's wallet address or identifier." },
        "to": { "type": "string", "description": "The recipient's wallet address or identifier." },
        "description": { "type": "string", "description": "A brief description of the transaction." }
      },
      "required": ["id", "type", "status", "amount", "date", "user", "accountId"]
    },
    "Advertisement": {
        "$schema": "http://json-schema.org/draft-07/schema#",
        "title": "Advertisement",
        "type": "object",
        "description": "Represents an advertiser's video or link for user engagement rewards.",
        "properties": {
            "id": { "type": "string", "description": "Unique ID for the advertisement." },
            "advertiserId": { "type": "string", "description": "The UID of the user account that owns this ad." },
            "title": { "type": "string", "description": "Title of the ad." },
            "type": { "type": "string", "enum": ["video", "url"], "description": "The type of advertisement." },
            "url": { "type": "string", "format": "uri", "description": "The URL for the video source or the click-through link." },
            "reward": { "type": "number", "description": "The amount of VSD Lite tokens rewarded for interaction." },
            "clicks": { "type": "number", "description": "The total number of clicks or completed views." },
            "createdAt": { "type": "string", "format": "date-time", "description": "ISO timestamp of when the ad was created." },
            "status": { "type": "string", "enum": ["Active", "Paused"], "description": "The status of the advertisement campaign." }
        },
        "required": ["id", "advertiserId", "title", "type", "url", "reward", "createdAt", "status", "clicks"]
    },
    "AdvertiserApplication": {
        "$schema": "http://json-schema.org/draft-07/schema#",
        "title": "Advertiser Application",
        "type": "object",
        "description": "Represents an application submitted by a user to become an advertiser.",
        "properties": {
            "userId": { "type": "string", "description": "The UID of the applicant." },
            "userName": { "type": "string", "description": "The applicant's display name." },
            "userEmail": { "type": "string", "format": "email", "description": "The applicant's email." },
            "companyName": { "type": "string", "description": "The name of the advertiser's company." },
            "website": { "type": "string", "format": "uri", "description": "The company's website." },
            "businessDescription": { "type": "string", "description": "A description of the business and advertising goals." },
            "status": { "type": "string", "enum": ["pending", "approved", "rejected"], "description": "The status of the application." },
            "submittedAt": { "type": "string", "format": "date-time", "description": "ISO timestamp of when the application was submitted." }
        },
        "required": ["userId", "userName", "userEmail", "companyName", "website", "status", "submittedAt"]
    }
  },
  "auth": {
    "providers": [ "google.com", "password" ]
  },
  "firestore": {
     "/admins/{adminId}": {
      "schema": { "$ref": "#/entities/Admin" },
      "description": "Stores a list of admin UIDs for role-based access control."
    },
    "/accounts/{accountId}": {
      "schema": { "$ref": "#/entities/Account" },
      "description": "Stores individual user account data, keyed by Firebase Auth UID."
    },
    "/accounts/{accountId}/transactions/{transactionId}": {
        "schema": { "$ref": "#/entities/Transaction"},
        "description": "A subcollection storing all transactions for a specific user account."
    },
    "/tenants/{tenantId}": {
        "schema": { "$ref": "#/entities/Tenant" },
        "description": "Top-level collection for all partner tenants integrated with the VSD Network."
    },
    "/transactions/{transactionId}": {
        "schema": { "$ref": "#/entities/Transaction" },
        "description": "A global log of all transactions for administrative overview. Can be secured for admin-only access."
    },
    "/advertisements/{advertisementId}": {
        "schema": { "$ref": "#/entities/Advertisement" },
        "description": "Stores all advertisement campaigns that users can interact with to earn VSD Lite."
    },
    "/advertiserApplications/{applicationId}": {
        "schema": { "$ref": "#/entities/AdvertiserApplication" },
        "description": "Stores applications from users wishing to become advertisers."
    }
  }
}