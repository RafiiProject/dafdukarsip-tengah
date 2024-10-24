// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_KEY,
    authDomain: "dafduk-arsip.firebaseapp.com",
    projectId: "dafduk-arsip",
    storageBucket: "dafduk-arsip.appspot.com",
    messagingSenderId: "793293497213",
    appId: "1:793293497213:web:c796179abd4c645c97a214"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  export const auth = getAuth(app);
  export const db = getFirestore(app);
  export const storage = getStorage(app);