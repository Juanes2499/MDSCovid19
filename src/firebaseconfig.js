import firebase from 'firebase';
import 'firebase/auth'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyCf1EUq2i7rtJuWeuybHRIEXzxAa73yRTo",
    authDomain: "pruebaols-ca4e1.firebaseapp.com",
    projectId: "pruebaols-ca4e1",
    storageBucket: "pruebaols-ca4e1.appspot.com",
    messagingSenderId: "1061732245287",
    appId: "1:1061732245287:web:ab2a0cd46e99169467d302",
    measurementId: "G-PRGNEJZWPS"
};

// Initialize Firebase
const fire =  firebase.initializeApp(firebaseConfig);
export const auth = fire.auth();
export const store = fire.firestore()