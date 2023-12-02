// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider } from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA3BJ--QBxrAxTH1yAgO_FIcVrcVV3-Gq4",
  authDomain: "dialogix-df81a.firebaseapp.com",
  projectId: "dialogix-df81a",
  storageBucket: "dialogix-df81a.appspot.com",
  messagingSenderId: "649563192324",
  appId: "1:649563192324:web:24ad6375f7152b17c6c951"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app);
export const provider = new GoogleAuthProvider();
export const db= getFirestore(app);