
import * as admin from 'firebase-admin';

// Ensure the environment variables are read.
import 'dotenv/config'

const serviceAccountKey = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;

if (!serviceAccountKey) {
    console.warn("FIREBASE_SERVICE_ACCOUNT_KEY is not set. Firebase Admin SDK will not be initialized.");
}

// Initialize Firebase Admin SDK only if not already initialized
if (!admin.apps.length && serviceAccountKey) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert(JSON.parse(serviceAccountKey)),
    });
  } catch (error: any) {
    console.error('Firebase Admin SDK initialization error:', error.stack);
  }
}

const getAdminDb = (): admin.firestore.Firestore => {
    if (!admin.apps.length) {
        // Return a mock or throw an error if you need to enforce initialization
        // For now, we'll log a warning and return a dummy object to prevent crashes
        // in environments where the SDK isn't needed (like client-side rendering).
        console.warn("Firebase Admin not initialized. Returning a mock Firestore instance.");
        return {} as admin.firestore.Firestore;
    }
    return admin.firestore();
};

export { getAdminDb };
