// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBgpwc7GJPMb-tFkN3Y1RoownbKyqjksRY",
  authDomain: "sports-fest2026theme.firebaseapp.com",
  projectId: "sports-fest2026theme",
  storageBucket: "sports-fest2026theme.firebasestorage.app",
  messagingSenderId: "398258077321",
  appId: "1:398258077321:web:e643fff6986b03d6c29058",
  measurementId: "G-NR5ZV0DMND"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);