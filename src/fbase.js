// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  // signInWithEmailAndPassword,
  // createUserWithEmailAndPassword,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
console.log("fkey", process.env.REACT_APP_API_KEY);
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

// Initialize Firebase
//const app = initializeApp(firebaseConfig);
//firebase.initializeApp(firebaseConfig);
//export default firebase.initializeApp(firebaseConfig);
const app = initializeApp(firebaseConfig);

export const firebaseInstance = firebase;

export const authService = getAuth(app);
export const dbService = getFirestore();
// export const si = signInWithEmailAndPassword;
// export const cr = createUserWithEmailAndPassword;

// export const authService = firebase.auth();

export const storageService = getStorage();