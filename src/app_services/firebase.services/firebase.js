import React, { createContext } from "react";
// remove this package import useState from 'react-usestateref'
import * as firebase from 'firebase';
import 'firebase/firestore';

export const FirebaseContext = createContext();

export const FirebaseContextProvider = ({ children }) => {

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
      uid: uid,
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
    const dateTime = new Date().toLocaleString()

    //Database of all emergency requests saved
    firebase.firestore().collection('Tracking').doc(dateTime).set({
      deviceID: deviceID,
      emergencyType: emergency,
      latitude: latitude,
      longitude: longitude,
      uid: uid,
      createdAt: dateTime,
    }).catch((e) => { console.log('Error at firebase.js') })

    //Tracker info
    firebase.firestore().collection('Recent').doc(uid).set({
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

          })

        });

    }//Medical Handled here



    else if (team == 'Fire') {
      firebase.firestore().collection("FAccept").where("userID", "==", uid).where("ETA", "!=", "null")
        .onSnapshot((querySnapshot) => {
          querySnapshot.forEach((doc) => {

            const time = doc.data().ETA;
            ctd(time);

          });

        })
    }//Fire Handled here



    else if (team == 'Security') {
      firebase.firestore().collection("SAccept").where("userID", "==", uid).where("ETA", "!=", "null")
        .onSnapshot((querySnapshot) => {
          querySnapshot.forEach((doc) => {

            const time = doc.data().ETA;
            ctd(time);

          });

        })
    }

  }


  //Use it to reset eta listener
  const closePreviousQuery = (dept) => {
    const user = firebase.auth().currentUser
    const uid = user.uid
    if (dept == 'Medical') {
      firebase.firestore().collection("MAccept").doc(uid).update({
        ETA: null
      })


    }//Medical Handled here



    else if (dept == 'Fire') {
      firebase.firestore().collection("FAccept").doc(uid).update({
        ETA: null
      })
    }//Fire Handled here



    else if (dept == 'Security') {
      firebase.firestore().collection("SAccept").doc(uid).update({
        ETA: null
      })
    }
  }

  const getInfo = async (sendData) => {
    const user = firebase.auth().currentUser
    const uid = user.uid
    const data = [];
    await firebase.firestore().collection('Users').doc(uid).get().then((docs) => {
      data.push(docs.data().name)
      data.push(docs.data().age)
      data.push(docs.data().emcContactName)
      data.push(docs.data().emcContactNumber)
      data.push(docs.data().medCondition)
      sendData(data)
    });
    return data
  }


  return (
    <FirebaseContext.Provider
      value={{
        sendTrackingData,
        storeUserData,
        getInfo,
        displayCountDown,
        closePreviousQuery,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );

}