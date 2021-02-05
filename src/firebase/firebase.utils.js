import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

var config = {
    apiKey: "AIzaSyCh4btKR7uhGqRQJIzogwJ4kUlBHwTRMzI",
    authDomain: "writer-818e0.firebaseapp.com",
    databaseURL: "https://writer-818e0.firebaseio.com",
    projectId: "writer-818e0",
    storageBucket: "writer-818e0.appspot.com",
    messagingSenderId: "957381171375",
    appId: "1:957381171375:web:d0879a5ce1590a7639dc5a",
    measurementId: "G-JRR9D41ZJV"
  };

  firebase.initializeApp(config);

  export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get(); 

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }
  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => auth.signInWithPopup(provider);