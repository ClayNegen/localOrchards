const firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");

const firebaseConfig = {
  apiKey: "AIzaSyChSK6-n4-JMDvnFV61zRc8J-fh9cMbZTQ",
  authDomain: "localorchards-62f89.firebaseapp.com",
  databaseURL: "https://localorchards-62f89.firebaseio.com",
  projectId: "localorchards-62f89",
  storageBucket: "localorchards-62f89.appspot.com",
  messagingSenderId: "1061483926826",
  appId: "1:1061483926826:web:2a1d664391762b1957ba53",
};

// Initialize Firebase and Firestore
firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();

export default db;
