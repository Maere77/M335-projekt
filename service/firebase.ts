import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBFnnyj0qv2D9mkz8qDmMj420vHcDaBNok",
    authDomain: "m335-mobile-app-sport.firebaseapp.com",
    projectId: "m335-mobile-app-sport",
    storageBucket: "m335-mobile-app-sport.firebasestorage.app",
    messagingSenderId: "1098692880230",
    appId: "1:1098692880230:web:733cc52bad1643399d4aa7",
    measurementId: "G-DHXKM7ZJG5",
};

const app = initializeApp(firebaseConfig);

// Firestore
export const db = getFirestore(app);

// Authentication
export const auth = getAuth(app);

// optional
export default app;