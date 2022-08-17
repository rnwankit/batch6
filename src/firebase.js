// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD1KtVtvqHuHtnLqE6dnuKGjMExhzyVg1w",
  authDomain: "ddemo-730dc.firebaseapp.com",
  projectId: "ddemo-730dc",
  storageBucket: "ddemo-730dc.appspot.com",
  messagingSenderId: "619244929942",
  appId: "1:619244929942:web:028a014b8159cc883bd3b7",
  measurementId: "G-GQLJTBRTP7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
const analytics = getAnalytics(app);