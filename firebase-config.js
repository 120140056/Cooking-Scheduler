import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth/react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyBmipUT-Z2Q37X8lvC1YGk3SMTgFQKMbvc",
  authDomain: "cooking-scheduler-d4f5e.firebaseapp.com",
  projectId: "cooking-scheduler-d4f5e",
  storageBucket: "cooking-scheduler-d4f5e.appspot.com",
  messagingSenderId: "813643875918",
  appId: "1:813643875918:web:fc188c314f6ab18dcba51f"
};

export const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
    persistence : getReactNativePersistence(AsyncStorage)
})