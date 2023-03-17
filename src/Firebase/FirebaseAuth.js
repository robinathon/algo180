// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; 
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: `${process.env.REACT_API_KEY}`,
  authDomain: `${process.env.REACT_AUTH_DOMAIN}`,
  projectId: `${process.env.REACT_PROJECT_ID}`,
  storageBucket: `${process.env.REACT_STORAGE_BUCKET}`,
  messagingSenderId: `${process.env.REACT_MESSAGING_SENDER_ID}`,
  appId: `${process.env.REACT_APP_ID}`,
  measurementId: `${process.env.REACT_MEASUREMENT_ID}`,

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
const provider = new GoogleAuthProvider();

export const signInWithGoogle = () => {
  signInWithPopup(auth, provider);
};
export const signOutFromGoogle = () => {
  signOut(auth, provider);
};
export const db = getFirestore(app);