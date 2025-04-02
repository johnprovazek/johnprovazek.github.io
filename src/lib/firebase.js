import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyArJmUpAZlX8sAYDLvvIePRkELG-TrqcMs",
  authDomain: "johnprovazek-c4e13.firebaseapp.com",
  projectId: "johnprovazek-c4e13",
  storageBucket: "johnprovazek-c4e13.appspot.com",
  messagingSenderId: "298756824411",
  appId: "1:298756824411:web:34b31467680edd05308e7e",
  measurementId: "G-8FBCT17EFS",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
