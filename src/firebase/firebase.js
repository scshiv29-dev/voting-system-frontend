// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBqRBRr4xZ7xX-RrwrLDwpDqh58Obz-M80",
  authDomain: "votingsystem-3b57c.firebaseapp.com",
  projectId: "votingsystem-3b57c",
  storageBucket: "votingsystem-3b57c.appspot.com",
  messagingSenderId: "885628820816",
  appId: "1:885628820816:web:c07a790f08ca88bfb96055",
  measurementId: "G-G59WKSNDSQ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();
const analytics = getAnalytics(app);

export { app, analytics, db };
