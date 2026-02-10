import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

let serviceAccount;
try {
  serviceAccount = JSON.parse(
    process.env.FIREBASE_SERVICE_ACCOUNT_KEY as string,
  );
} catch (e) {
  console.error("Parsing error FIREBASE_SERVICE_ACCOUNT_KEY:", e);
  throw e;
}

if (!getApps().length) {
  initializeApp({
    credential: cert(serviceAccount),
  });
}

export const db = getFirestore();
