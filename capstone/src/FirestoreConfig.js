import firebase from 'firebase';
require('firebase/firestore')

// Initialize Firebase
var config = {
    apiKey: "AIzaSyB-8XgnxEoF_ZSvaj5UmItEeYxpLOiF2yY",
    authDomain: "capstone-d0e8a.firebaseapp.com",
    databaseURL: "https://capstone-d0e8a.firebaseio.com",
    projectId: "capstone-d0e8a",
    storageBucket: "capstone-d0e8a.appspot.com",
    messagingSenderId: "37839054396"
};
firebase.initializeApp(config);

export const ref = firebase.database().ref()
export const auth = firebase.auth
export const provider = new firebase.auth.FacebookAuthProvider();
export const db = firebase.firestore();
