import firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyA0z9t0bA1Ag1c6tmIA1mHK-R5Wcax7xUc',
  authDomain: 'internet-be7f9.firebaseapp.com',
  databaseURL: 'https://internet-be7f9.firebaseio.com',
  projectId: 'internet-be7f9',
  storageBucket: 'internet-be7f9.appspot.com',
  messagingSenderId: '506621013811',
};

firebase.initializeApp(config);

export const favorites = firebase
  .database()
  .ref('/favorites');
  
export const googleProvider = new firebase.auth.GoogleAuthProvider();
export default firebase;
