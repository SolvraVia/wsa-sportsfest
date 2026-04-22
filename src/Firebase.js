import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBgpwc7GJPMb-tFkN3Y1RoownbKyqjksRY",
  authDomain: "sports-fest2026theme.firebaseapp.com",
  projectId: "sports-fest2026theme",
  storageBucket: "sports-fest2026theme.firebasestorage.app",
  messagingSenderId: "398258077321",
  appId: "1:398258077321:web:e643fff6986b03d6c29058",
  measurementId: "G-NR5ZV0DMND"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);