// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyARnTxmWYudjl6fKpvgWKOVsHrbxXZMiRQ",
  authDomain: "sabrine-f30cf.firebaseapp.com",
  projectId: "sabrine-f30cf",
  storageBucket: "sabrine-f30cf.appspot.com",
  messagingSenderId: "643159210457",
  appId: "1:643159210457:web:c02efcea0594af205181c8",
  measurementId: "G-52HS0RJTB6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);