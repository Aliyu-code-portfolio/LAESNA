import React, { createContext } from "react";
// remove this package import useState from 'react-usestateref'
import * as firebase from 'firebase';
import 'firebase/firestore';

export const FirebaseContext = createContext();

export const FirebaseContextProvider = ({ children }) => {
  const countDown = (time) => {

  }

  const storeUserData = (email, name, emcContact, emcContactNumber, age, medCon) => {
    const user = firebase.auth().currentUser
    const uid = user.uid
    firebase.firestore().collection('Users').doc(uid).set({
      name: name,
      email: email,
      age: age,
      emcContactName: emcContact,
      emcContactNumber: emcContactNumber,
      medCondition: medCon,
      createdAccountAt: firebase.firestore.FieldValue.serverTimestamp()
    })
      .catch((error) => {
        console.log('Error at firebase.js')
      });
    return true
  }

  const sendTrackingData = (deviceID, emergency, latitude, longitude) => {
    const user = firebase.auth().currentUser
    const uid = user.uid
    const dateTime = firebase.firestore.FieldValue.serverTimestamp()
    firebase.firestore().collection('Tracking').add({
      deviceID: deviceID,
      emergencyType: emergency,
      latitude: latitude,
      longitude: longitude,
      read: 'No',
      uid: uid,
      createdAt: dateTime,
    }).catch((e) => { console.log('Error at firebase.js') })
    return true
  }

  const displayCountDown = async (team, ctd) => {
    const user = firebase.auth().currentUser
    const uid = user.uid
    if (team == 'Medical') {
      firebase.firestore().collection("MAccept").where("userID", "==", uid).where("ETA", "!=", "null")
        .onSnapshot((querySnapshot) => {
          querySnapshot.forEach((doc) => {

            const time = doc.data().ETA;
            ctd(time);

          });

        });
    }//Medical Handled here



    else if (team == 'Fire') {
      firebase.firestore().collection("FAccept").where("userID", "==", uid).where("ETA", "!=", "null")
        .onSnapshot((querySnapshot) => {
          querySnapshot.forEach((doc) => {

            const time = doc.data().ETA;
            ctd(time);

          });

        });
    }//Fire Handled here



    else if (team == 'Security') {
      firebase.firestore().collection("SAccept").where("userID", "==", uid).where("ETA", "!=", "null")
        .onSnapshot((querySnapshot) => {
          querySnapshot.forEach((doc) => {

            const time = doc.data().ETA;
            ctd(time);

          });

        });
    }

  }

  const getName = async () => {
    const user = firebase.auth().currentUser
    const uid = user.uid
    const data = [];
    await firebase.firestore().collection('Users').doc(uid).get().then((docs) => {
      data.push(docs.data().name)
    });
    return data
  }

  const getAge = () => {
    const user = firebase.auth().currentUser
    const uid = user.uid
    const data = [];
    firebase.firestore().collection('Users').doc(uid).get().then((docs) => {
      data.push(docs.data().age)
    });
    return data
  }

  const getEcontactname = () => {
    const user = firebase.auth().currentUser
    const uid = user.uid
    const data = [];
    firebase.firestore().collection('Users').doc(uid).get().then((docs) => {
      data.push(docs.data().emcContactName)
    });
    return data
  }

  const getEnumber = () => {
    const user = firebase.auth().currentUser
    const uid = user.uid
    const data = [];
    firebase.firestore().collection('Users').doc(uid).get().then((docs) => {
      data.push(docs.data().emcContactNumber)
    });
    return data
  }

  const getPremed = () => {
    const user = firebase.auth().currentUser
    const uid = user.uid
    const data = [];
    firebase.firestore().collection('Users').doc(uid).get().then((docs) => {
      data.push(docs.data().medCondition)
    });
    return data
  }


  return (
    <FirebaseContext.Provider
      value={{
        sendTrackingData,
        storeUserData,
        getName,
        getAge,
        getEcontactname,
        getEnumber,
        getPremed,
        displayCountDown
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );

}