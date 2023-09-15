import { initializeApp} from "firebase/app";
import {GoogleAuthProvider, getAuth} from "firebase/auth"
const firebaseConfig = {
  apiKey: "AIzaSyDelOUK5sTBYHdvbxzUlW1kEWYaNvhMKlY",
  authDomain: "texnomart-83b7b.firebaseapp.com",
  projectId: "texnomart-83b7b",
  storageBucket: "texnomart-83b7b.appspot.com",
  messagingSenderId: "463108635318",
  appId: "1:463108635318:web:721aa7ae07b1e874168417",
  measurementId: "G-EFCCJ71EEX"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const GoogleProvider = new GoogleAuthProvider()