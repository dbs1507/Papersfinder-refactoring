import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_APIKEY,
  authDomain: process.env.NEXT_PUBLIC_AUTHDOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECTID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGEBUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGINGSENDERID,
  appId: process.env.NEXT_PUBLIC_APPID,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENTID
};
// const firebaseConfig = {
//     apiKey: "AIzaSyDqrhI8odGogD7FTJvhUWVlYGqeSlYE3pg",
//     authDomain: "papersfinder-aed7c.firebaseapp.com",
//     projectId: "papersfinder-aed7c",
//     storageBucket: "papersfinder-aed7c.appspot.com",
//     messagingSenderId: "671486215155",
//     appId: "1:671486215155:web:5a336c414e1a8e505ec886",
//     measurementId: "G-613HL8MP3V"
// };
  

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
