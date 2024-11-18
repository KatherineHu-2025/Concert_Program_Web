// firebaseConfig.js
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyD3rQy8WuuqJ6zdMV-jtvTImWv2wHU3_V8",
    authDomain: "concertprogramweb.firebaseapp.com",
    projectId: "concertprogramweb",
    storageBucket: "concertprogramweb.firebasestorage.app",
    messagingSenderId: "670437320626",
    appId: "1:670437320626:web:a26508f97e5186d4d126ab",
    measurementId: "G-R3Q7RGWD2Y"
  };
  

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Export the Firebase authentication instance
export const auth = getAuth(app);