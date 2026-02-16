import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyASbboqV2dAwqYLPYLfh4YhkcpLE-S_Obc",
    authDomain: "printflow-studio-e4a98.firebaseapp.com",
    projectId: "printflow-studio-e4a98",
    storageBucket: "printflow-studio-e4a98.firebasestorage.app",
    messagingSenderId: "469108669154",
    appId: "1:469108669154:web:e1a5b9fc83a9da68c4fcbb",
    measurementId: "G-MW2N70WBQ4"
};

const app = initializeApp(firebaseConfig);

// ✅ THESE are what your app expects
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
