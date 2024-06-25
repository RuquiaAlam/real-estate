// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "real-estate-1e754.firebaseapp.com",
  projectId: "real-estate-1e754",
  storageBucket: "real-estate-1e754.appspot.com",
  messagingSenderId: "236995504622",
  appId: "1:236995504622:web:a478c416f2c7f4b528c6ff",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
