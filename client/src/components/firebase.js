// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-f05b1.firebaseapp.com",
  projectId: "mern-blog-f05b1",
  storageBucket: "mern-blog-f05b1.appspot.com",
  messagingSenderId: "564594850888",
  appId: "1:564594850888:web:c1af6ecfea4dca2a2d2c7d"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);