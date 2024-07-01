import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDqrhI8odGogD7FTJvhUWVlYGqeSlYE3pg",
    authDomain: "papersfinder-aed7c.firebaseapp.com",
    projectId: "papersfinder-aed7c",
    storageBucket: "papersfinder-aed7c.appspot.com",
    messagingSenderId: "671486215155",
    appId: "1:671486215155:web:5a336c414e1a8e505ec886",
    measurementId: "G-613HL8MP3V"
};
    

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
