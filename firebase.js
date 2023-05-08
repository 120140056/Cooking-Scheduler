// Import the functions you need from the SDKs you need
import * as firebase from "firebase";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBmipUT-Z2Q37X8lvC1YGk3SMTgFQKMbvc",
  authDomain: "cooking-scheduler-d4f5e.firebaseapp.com",
  projectId: "cooking-scheduler-d4f5e",
  storageBucket: "cooking-scheduler-d4f5e.appspot.com",
  messagingSenderId: "813643875918",
  appId: "1:813643875918:web:fc188c314f6ab18dcba51f"
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app()
}

const auth = firebase.auth()

export { auth };