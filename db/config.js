// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const analytics = getAnalytics(app);