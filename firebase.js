// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyARmkFy7XXvkylDqa368W49G-wtf1e242Y",
  authDomain: "inventory-management-app-ca05a.firebaseapp.com",
  projectId: "inventory-management-app-ca05a",
  storageBucket: "inventory-management-app-ca05a.appspot.com",
  messagingSenderId: "106802227097",
  appId: "1:106802227097:web:6e529edd98d4e5e4fdd508",
  measurementId: "G-YH64PBQ5EV",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
export { firestore };
