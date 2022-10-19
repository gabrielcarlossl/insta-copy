// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC930GHzGFfN253bJ2g2s9C2TaHYjbftNw",
  authDomain: "insta-copy-g7.firebaseapp.com",
  projectId: "insta-copy-g7",
  storageBucket: "insta-copy-g7.appspot.com",
  messagingSenderId: "770190652725",
  appId: "1:770190652725:web:8a16313179469a51c8087c",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export { app, db, storage };
