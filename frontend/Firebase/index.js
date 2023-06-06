  // Import the functions you need from the SDKs you need
  import { initializeApp } from "firebase/app";
  import { getAnalytics } from "firebase/analytics";
  import {getAuth , GoogleAuthProvider} from "firebase/auth"
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries
  
  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyAAYWvZwUsHZ0YE6VwpwajrdX4tSw0LBzQ",
    authDomain: "eco-tracker-51fc3.firebaseapp.com",
    projectId: "eco-tracker-51fc3",
    storageBucket: "eco-tracker-51fc3.appspot.com",
    messagingSenderId: "791593300222",
    appId: "1:791593300222:web:223278dddc047d699735af",
    measurementId: "G-DD26F97BCM"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
   const auth = getAuth();
   const googleAuthProvider= new GoogleAuthProvider()
   export {auth, googleAuthProvider}