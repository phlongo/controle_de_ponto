// Import the functions you need from the SDKs you need
import firebase from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA5e1mo4xhSaox2BvNqUgGzfHg9PtJJ_2U",
  authDomain: "fir-projetodeponto.firebaseapp.com",
  projectId: "fir-projetodeponto",
  storageBucket: "fir-projetodeponto.appspot.com",
  messagingSenderId: "1064496588606",
  appId: "1:1064496588606:web:e17bf592b585893aad2e6f",
  measurementId: "G-3SQR14C0JK"
};

// Initialize Firebase

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service

export default getFirestore();