import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore'; // for the db
import 'firebase/compat/auth';

const config = { 
        apiKey: "AIzaSyAERzx3WpS_A_AdpOl-77amXeec8BFq_z0",
        authDomain: "my-stripe-app-562f7.firebaseapp.com",
        projectId: "my-stripe-app-562f7",
        storageBucket: "my-stripe-app-562f7.appspot.com",
        messagingSenderId: "241104647687",
        appId: "1:241104647687:web:ca876d107af4e222fbdca2",
        measurementId: "G-J8K6ZTGLF9"
}

firebase.initializeApp(config); 
const firestore = firebase.firestore();
const auth = firebase.auth(); 

// creates user profile in Firebase
const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) { return; }   

  const userRef = firestore.doc(`users/${userAuth.multiFactor.user.uid}`); // unique id per user
  const snapShot = await userRef.get(); 

  // if there is no profile, create one 
  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({displayName, email, createdAt, ...additionalData, });
    } catch (error) {
        console.log('error creating user', error.message);
      }   
   }
return userRef;
}; 

export { firestore, createUserProfileDocument, auth };