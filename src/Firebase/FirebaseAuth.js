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
  /*apiKey: `${process.env.REACT_API_KEY}`,
  authDomain: `${process.env.REACT_AUTH_DOMAIN}`,
  projectId: `${process.env.REACT_PROJECT_ID}`,
  storageBucket: `${process.env.REACT_STORAGE_BUCKET}`,
  messagingSenderId: `${process.env.REACT_MESSAGING_SENDER_ID}`,
  appId: `${process.env.REACT_APP_ID}`,
  measurementId: `${process.env.REACT_MEASUREMENT_ID}`,*/
  apiKey: "AIzaSyDh3IpqLsHezM3SeOXlAIZAwmR_siOz428",

  authDomain: "algo180.firebaseapp.com",

  projectId: "algo180",

  storageBucket: "algo180.appspot.com",

  messagingSenderId: "823186413947",

  appId: "1:823186413947:web:42e9f36fa1d9962a0685de",

  measurementId: "G-PMMKT7F0WG"


};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export const signInWithGoogle = () => {
  signInWithPopup(auth, provider);
};
export const signOutFromGoogle = () => {
  console.log("hitted");
  signOut(auth, provider);
};
// export const signInAsGuest = () => {
//   signInAnonymously(auth, provider);
// };
export const db = getFirestore(app);
