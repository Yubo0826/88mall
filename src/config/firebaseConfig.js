// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";



const firebaseConfig = {
  apiKey: "AIzaSyBFt1VcF7zg_mmpCeXD2zgkpYLKp4xdAZg",
  authDomain: "iann-shop.firebaseapp.com",
  databaseURL: "https://iann-shop-default-rtdb.firebaseio.com",
  projectId: "iann-shop",
  storageBucket: "iann-shop.appspot.com",
  messagingSenderId: "1075305381504",
  appId: "1:1075305381504:web:a5662ea2d591dc45eeb065",
  measurementId: "G-D9V6B6NXGV"
};


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);


