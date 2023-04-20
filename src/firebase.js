import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "mychatapp-36c63.firebaseapp.com",
  projectId: "mychatapp-36c63",
  storageBucket: "mychatapp-36c63.appspot.com",
  messagingSenderId: "862861275873",
  appId: "1:862861275873:web:58ff59c2e9c58a86c37da0"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();