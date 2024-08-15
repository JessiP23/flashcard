// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA0nPJ0rRFFhCkjbJT6-LbtUcXIZrQPD1k",
  authDomain: "flashcard-4438b.firebaseapp.com",
  projectId: "flashcard-4438b",
  storageBucket: "flashcard-4438b.appspot.com",
  messagingSenderId: "423538661895",
  appId: "1:423538661895:web:cb5e18a8e513b23129a8a2",
  measurementId: "G-L5335DRVHS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
export {db}