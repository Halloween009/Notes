import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

// Получаем ключ сервисного аккаунта из переменной окружения
console.log(
  "SERVICE_ACCOUNT_KEY:",
  process.env.FIREBASE_SERVICE_ACCOUNT_KEY?.slice(0, 100),
);
let serviceAccount;
try {
  serviceAccount = JSON.parse(
    process.env.FIREBASE_SERVICE_ACCOUNT_KEY as string,
  );
} catch (e) {
  console.error("Ошибка парсинга FIREBASE_SERVICE_ACCOUNT_KEY:", e);
  throw e;
}

if (!getApps().length) {
  initializeApp({
    credential: cert(serviceAccount),
  });
}

export const db = getFirestore();
