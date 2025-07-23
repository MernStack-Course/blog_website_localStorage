// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAfAzHII_xh3lJXSCj_1wdYJ4Z_8Au-tCQ",
  authDomain: "blogwebsite-41c9a.firebaseapp.com",
  projectId: "blogwebsite-41c9a",
  storageBucket: "blogwebsite-41c9a.firebasestorage.app",
  messagingSenderId: "729462753956",
  appId: "1:729462753956:web:a11474f42b4c2233363431"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export {db};