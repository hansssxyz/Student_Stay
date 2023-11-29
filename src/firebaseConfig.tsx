import config from './config.js';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyAJnwWudhi15F9HOJwC1y31KrppKyvkdkg",
    authDomain: "studentstay-columbia.firebaseapp.com",
    projectId: "studentstay-columbia",
    storageBucket: "studentstay-columbia.appspot.com",
    messagingSenderId: "812651266228",
    appId: "1:812651266228:web:f55ece244da292055d97e1",
    measurementId: "G-M5DTGZPLJN"
}, 'student-stay-firebase');

export default firebaseApp;
