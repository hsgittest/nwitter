// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD8GHUdxHSSUBexJ8iWn2fP2I4rmc0lMas",
  authDomain: "nwitter-4f9d5.firebaseapp.com",
  projectId: "nwitter-4f9d5",
  storageBucket: "nwitter-4f9d5.appspot.com",
  messagingSenderId: "441939912833",
  appId: "1:441939912833:web:b3c54f54dcd70aac4d0580"
};

// Initialize Firebase
//const app = initializeApp(firebaseConfig);
export default firebase.initializeApp(firebaseConfig);