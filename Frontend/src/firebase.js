// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import {getAuth} from 'firebase/auth'
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "cravemeal-6003d.firebaseapp.com",
  projectId: "cravemeal-6003d",
  storageBucket: "cravemeal-6003d.appspot.com.app",
  messagingSenderId: "922977731095",
  appId: "1:922977731095:web:41fb498fa2e35879c81252"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig); 

const auth = getAuth(app)

export {app, auth}