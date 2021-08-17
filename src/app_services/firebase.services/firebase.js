import * as firebase from 'firebase';
import 'firebase/firestore';

export const sendTrackingData = (deviceID, emergency, latitude, longitude) => {
  const firebaseConfig = {
    apiKey: 'AIzaSyC5JP7q6d4M21jrcA7R1zh6-NgtFlQMMBI',
    authDomain: 'laesna-d7c83.firebaseapp.com',
    projectId: 'laesna-d7c83',
    storageBucket: 'laesna-d7c83.appspot.com',
    messagingSenderId: '955485269180',
    appId: '1:955485269180:web:f66e1be2004d44911ab4b9',
    measurementId: 'G-23L5DWHGSZ',
  };
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  firebase.firestore().collection('Tracking').add({
    deviceID: deviceID,
    emergencyType: emergency,
    latitude: latitude,
    longitude: longitude,
    read: 'No',
    createdAt: firebase.firestore.FieldValue.serverTimestamp()
  }).catch((e) => { console.log('Error at firebase.js') })
  return true
}