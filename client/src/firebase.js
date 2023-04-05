// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBVNnAQYyMdKFdAYRyx_lVPotwSQ5CaEOA",
  authDomain: "syedchat-6e2d2.firebaseapp.com",
  projectId: "syedchat-6e2d2",
  storageBucket: "syedchat-6e2d2.appspot.com",
  messagingSenderId: "575318736001",
  appId: "1:575318736001:web:1011b66f781900b506e180"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

//GoogleAuth
export const provider = new GoogleAuthProvider();
export const auth = getAuth();
