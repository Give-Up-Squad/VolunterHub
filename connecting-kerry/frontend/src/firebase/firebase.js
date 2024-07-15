// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // Import Firestore
import { getStorage } from "firebase/storage"; // Import Cloud Storage
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBfIO6awTHpUxm95b4QvHzesBH_jhwcmjQ",
  authDomain: "connecting-kerry.firebaseapp.com",
  projectId: "connecting-kerry",
  storageBucket: "connecting-kerry.appspot.com",
  messagingSenderId: "914517593139",
  appId: "1:914517593139:web:91933f1208f2df9852e746",
  measurementId: "G-H4FJPB518N",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app); // Initialize Firestore
const storage = getStorage(app); // Initialize Cloud Storage

const auth = getAuth(app);

export { app, auth, db, storage };
