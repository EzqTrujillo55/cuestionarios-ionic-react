import firebase from 'firebase';

export const firebaseConfig = {
    apiKey: "AIzaSyAOh5LCL6ZANXHQFl33q5VcnzmJTxTldIQ",
    authDomain: "cuestionarios-app.firebaseapp.com",
    projectId: "cuestionarios-app",
    storageBucket: "cuestionarios-app.appspot.com",
    messagingSenderId: "557656511344",
    appId: "1:557656511344:web:6a975fef553c05afdc75b5",
    measurementId: "G-PLBZ7C69XH"
};

export const fb = firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();
 