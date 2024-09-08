import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDwubw1P5W9d3MBFtu143QOcjWnoGy98iE",
  authDomain: "tutorapp-8fe34.firebaseapp.com",
  projectId: "tutorapp-8fe34",
  storageBucket: "tutorapp-8fe34.appspot.com",
  messagingSenderId: "155599790605",
  appId: "1:155599790605:web:67cddcdc7cb1295cf82b44",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Get Firestore database instance
