// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBxuNcB1vpuHT7z9wMnxFuZSKHFdLhRFSo",
    authDomain: "auth-firebase-c8c80.firebaseapp.com",
    projectId: "auth-firebase-c8c80",
    storageBucket: "auth-firebase-c8c80.firebasestorage.app",
    messagingSenderId: "207064818866",
    appId: "1:207064818866:web:f17ef5d7507d8ec4f815ab"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);