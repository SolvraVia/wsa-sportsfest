import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"; 

const firebaseConfig = {
  apiKey: "AIzaSyBW5pOF_UnzvwHPh31ELO4YFRE-GuHQkSo",
  authDomain: "sf-fleets.firebaseapp.com",
  projectId: "sf-fleets",
  storageBucket: "sf-fleets.firebasestorage.app",
  messagingSenderId: "940571371801",
  appId: "1:940571371801:web:0cd86c60cf7104eed6fd88",
  measurementId: "G-X9BGSJJ0E3"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);