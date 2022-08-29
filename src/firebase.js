// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDJ9KA9aAyWAH5sgJmwgPuhNLmmf36A19Y",
  authDomain: "batch4-15247.firebaseapp.com",
  projectId: "batch4-15247",
  storageBucket: "batch4-15247.appspot.com",
  messagingSenderId: "493399460184",
  appId: "1:493399460184:web:2afee9ff799d26cee57d2d",
  measurementId: "G-YQQPVKR3GT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage(app);
export const db = getFirestore(app);