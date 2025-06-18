// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCWV7G0eQf4JXwUTdxziaYPt_BwaNFHFYM",
  authDomain: "mi-chat-app-f4b95.firebaseapp.com",
  projectId: "mi-chat-app-f4b95",
  storageBucket: "mi-chat-app-f4b95.firebasestorage.app",
  messagingSenderId: "29762199979",
  appId: "1:29762199979:web:2d7c5bea605d920f9e72ee"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);