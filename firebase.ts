import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import {getMessaging, getToken, onMessage} from "firebase/messaging"

const firebaseConfig = {
  apiKey: "AIzaSyBHs4kinzinFpMc8_fyAi0GhsXYQvX6D8M",
  authDomain: "mobile-auth-a6933.firebaseapp.com",
  projectId: "mobile-auth-a6933",
  storageBucket: "mobile-auth-a6933.appspot.com",
  messagingSenderId: "801320668131",
  appId: "1:801320668131:web:fac539327004090aaeaed6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)

const messaging = getMessaging(app)

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });

const generateToken = async () => {
  const permission = await Notification.requestPermission()
  if(permission == "granted") {
    const token = await getToken(messaging, {
      vapidKey: import.meta.env.VITE_VAPID_KEY
    })
    // console.log(token)
  }
}

export {auth, db, messaging, generateToken}