import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCNM17aKL0QLnGnqOgI-Y3i2gVLVAgVKIA",
  authDomain: "wonders-of-aklan.firebaseapp.com",
  projectId: "wonders-of-aklan",
  storageBucket: "wonders-of-aklan.firebasestorage.app",
  messagingSenderId: "634032305317",
  appId: "1:634032305317:web:3ff71cbf4c42412793894c",
  measurementId: "G-891GQ0GL04"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
