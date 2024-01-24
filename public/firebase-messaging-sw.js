importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
const firebaseConfig = {
    apiKey: "AIzaSyBHs4kinzinFpMc8_fyAi0GhsXYQvX6D8M",
    authDomain: "mobile-auth-a6933.firebaseapp.com",
    projectId: "mobile-auth-a6933",
    storageBucket: "mobile-auth-a6933.appspot.com",
    messagingSenderId: "801320668131",
    appId: "1:801320668131:web:fac539327004090aaeaed6"
};

firebase.initializeApp(firebaseConfig);

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging()

messaging.onBackgroundMessage((payload) => {
    console.log('Message received. ', payload);
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body
    };
    self.registration.showNotification(notificationTitle, notificationOptions)
});