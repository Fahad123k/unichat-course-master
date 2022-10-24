import firebase from "firebase/app";
import "firebase/auth";

export const auth =firebase.initializeApp ({
    apiKey: "AIzaSyAmu2JmC4Uy4jz0tZ6e5yr5-1B2achX8i4",
    authDomain: "minichat-13a24.firebaseapp.com",
    projectId: "minichat-13a24",
    storageBucket: "minichat-13a24.appspot.com",
    messagingSenderId: "368876772626",
    appId: "1:368876772626:web:4302bd29c8e588df9567cb"
  }).auth();

  