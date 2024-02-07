// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";
import { getDatabase } from 'firebase/database';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBJlWpKLcv91rLEOMvlvVghrlLJRCNoEsA",
  authDomain: "todo-task-65e07.firebaseapp.com",
  databaseURL:"https://todo-task-65e07-default-rtdb.firebaseio.com/",
  projectId: "todo-task-65e07",
  storageBucket: "todo-task-65e07.appspot.com",
  messagingSenderId: "167594311808",
  appId: "1:167594311808:web:54c9ccf9a82986eb7fa665"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getDatabase(app);
