import { getAuth } from "firebase/auth";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCoX7wWRRWcyyZkjJ3bgGbUdUe6vDjVltM",
  authDomain: "nesttree-d03bc.firebaseapp.com",
  projectId: "nesttree-d03bc",
  storageBucket: "nesttree-d03bc.firebasestorage.app",
  messagingSenderId: "764045123286",
  appId: "1:764045123286:web:f9475e4fd9d32af523f377"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;