// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getMessaging} from 'firebase/messaging'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCGR9WMffzxkE5sOE7cqLEca4Evn9OB_SY",
    authDomain: "tuniko.firebaseapp.com",
    projectId: "tuniko",
    storageBucket: "tuniko.appspot.com",
    messagingSenderId: "1085864700854",
    appId: "1:1085864700854:web:3b75e09a965f16c7766f17",
    measurementId: "G-4QM6Z01HMY"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebaseApp);

let messaging

    messaging = getMessaging(firebaseApp);

export { messaging }
