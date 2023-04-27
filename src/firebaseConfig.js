import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB2WcFVxAWH-QIMjo2LEFmzarHDEUhLlU0",
  authDomain: "realestate-6f51f.firebaseapp.com",
  projectId: "realestate-6f51f",
  storageBucket: "realestate-6f51f.appspot.com",
  messagingSenderId: "395412661959",
  appId: "1:395412661959:web:3351bd5473d50a29d800e2",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const auth = getAuth(app);
