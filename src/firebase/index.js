import firebase from 'firebase/app';
import 'firebase/firebase'; // for the database 

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

export { firestore }