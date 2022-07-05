// Firebase
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDf_x619ALNbChd8o9sPiwP5-dSy64J1bs",
    authDomain: "top-ten-movies.firebaseapp.com",
    projectId: "top-ten-movies",
    storageBucket: "top-ten-movies.appspot.com",
    messagingSenderId: "181636574290",
    appId: "1:181636574290:web:567da5af809d537c5f838b"
  };
  
  // Initialize Firebase
  initializeApp(firebaseConfig);

   // Initialise Firebase services
   const db = getFirestore();

   // inialise Firebase auth
   const auth = getAuth();

   export { auth, db }