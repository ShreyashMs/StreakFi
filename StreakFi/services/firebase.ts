import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAOa6OR_NdxNz96nOGuZc_s_0aCYPBDKqs",
  authDomain: "streakfi.firebaseapp.com",
  projectId: "streakfi",
  storageBucket: "streakfi.firebasestorage.app",
  messagingSenderId: "985790246014",
  appId: "1:985790246014:web:623a5b1068e6cf1b7bfc2f",
  measurementId: "G-C12HCB12CQ"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);