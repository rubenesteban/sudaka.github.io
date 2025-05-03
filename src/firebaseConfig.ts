// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCKzhAhgpg5BM8e4M1Wh9IKPFGW5Hdnp74", // Reemplaza con tu API Key
  authDomain: "before-fly.firebaseapp.com", // Reemplaza con tu Auth Domain
  projectId: "before-fly", // Reemplaza con tu Project ID
  storageBucket: "before-fly.appspot.com",// Reemplaza con tu Storage Bucket
  messagingSenderId: "998339062661", // Reemplaza con tu Messaging Sender ID
  appId: "1:998339062661:web:d487ee847f8e0b35beb2ec"// Reemplaza con tu App ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);