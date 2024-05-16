// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app"
import firebase from "firebase/compat/app";
import "firebase/compat/storage";
import "firebase/compat/database";
import "firebase/compat/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDDUkIFO7kLLmVk262RLNoXIEQD_1y7SFs",
  authDomain: "medical2-32d69.firebaseapp.com",
  databaseURL: "https://medical2-32d69-default-rtdb.firebaseio.com",
  projectId: "medical2-32d69",
  storageBucket: "medical2-32d69.appspot.com",
  messagingSenderId: "308690741670",
  appId: "1:308690741670:web:4d630f6d58263df7914767"
  
};

// Initialize Firebase
const firedb = initializeApp(firebaseConfig);
export default firedb;





