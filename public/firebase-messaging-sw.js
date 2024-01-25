importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

const firebaseConfig = {
    apiKey: "AIzaSyBHs4kinzinFpMc8_fyAi0GhsXYQvX6D8M",
    authDomain: "mobile-auth-a6933.firebaseapp.com",
    projectId: "mobile-auth-a6933",
    storageBucket: "mobile-auth-a6933.appspot.com",
    messagingSenderId: "801320668131",
    appId: "1:801320668131:web:fac539327004090aaeaed6"
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('Received background notification ', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle,
    notificationOptions);
});