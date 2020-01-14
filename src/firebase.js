import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDMfZsqpwGFxG4rkLxLRGVk54BSvFAGV8k",
  authDomain: "backlife-backend.firebaseapp.com",
  databaseURL: "https://backlife-backend.firebaseio.com",
  projectId: "backlife-backend",
  storageBucket: "backlife-backend.appspot.com",
  messagingSenderId: "1046952538939",
  appId: "1:1046952538939:web:11b9edc3c13e283ad57d1e",
  measurementId: "G-KPMZEZPCNB"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
//firebase.analytics();

export const firestore = firebase.firestore();
export const auth = firebase.auth();
export const storage = firebase.storage();

export const provider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = () => auth.signInWithPopup(provider);
export const signOut = () => auth.signOut();

export const createUserProfileDocument = async (user, additionalData) => {
  if (!user) return;
  console.log("we gettin the user", user);
  //get ref to user
  const userRef = firestore.doc(`users/${user.uid}`);
  //fetch doc from that location
  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const { displayName, email } = user;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        //photoUrl,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.error(error.message);
    }
  }
  return getUserDocument(user.uid);
};

export const getUserDocument = async uid => {
  if (!uid) return null;
  try {
    return firestore.collection("users").doc(uid);
  } catch (error) {
    console.error(error.message);
  }
};

export default firebase;
