// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBS4uxQb5zroJ-gRRn135fTzxk9UwPrOL8",
  authDomain: "react-contact-app-c2578.firebaseapp.com",
  projectId: "react-contact-app-c2578",
  storageBucket: "react-contact-app-c2578.appspot.com",
  messagingSenderId: "302106344253",
  appId: "1:302106344253:web:de6e1b7516074a2d5ea354"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)