import React, { useState, useEffect } from 'react'
import { Text, TextInput, View, StyleSheet, Image, Alert, TouchableOpacity, Vibration } from 'react-native'
import ConnectivityManager from "react-native-connectivity-status"

import { getDeviceID, getLocation } from '../app_services/location.services/location.scan'
import { sendTrackingData } from '../app_services/firebase.services/firebase'
import { SafeArea } from '../app_utils/safe-area.component'

export const EmergencySelector = ({ route }) => {

  const sendDistress = async (emergency) => {
    const myDevice = getDeviceID();
    const myLocation = getLocation();
    setTimeout(function () {
      //Help prevent sending error data due to location service been off
      if (myLocation._W) {
        const latitude = myLocation._W.coords.latitude
        const longitude = myLocation._W.coords.longitude
        const status = sendTrackingData(myDevice, emergency, latitude, longitude);
        //Simple display confirming help is coming
        if (status) {
          Alert.alert(
            "Sent",
            "Your location have been sent to " + emergency + " dapartment. Please remain calm while help arrive",
            [
              {
                text: "Ok",
                style: "cancel"
              }
            ]
          );

        }

      }
      else {
        Alert.alert(
          "We couldn't track your location",
          "This could be due to LAESNA not been granted permission to access your device's location. Please accept permissions and turn on location and try again",
          [
            {
              text: "Ok",
              style: "cancel"
            }
          ]
        );

      }

    }, 2300);
    vibrate()
  }

  const vibrate = () => {
    if (Platform.OS === 'ios') {
      const interval = setInterval(() => Vibration.vibrate(), 40);
      setTimeout(() => clearInterval(interval), 1000);
    } else {
      Vibration.vibrate(40);
    }
  };

  return (
    <SafeArea>
      <View style={styles.container}>
        <View style={styles.imgContainer1}>
          <TouchableOpacity onPress={() => sendDistress()}
          >
            <Image source={require('../../assets/edit.png')} style={styles.img} />
            <Text style={{ paddingTop: 10, }}>Edit Your Details</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeArea>
  )

}
const styles = StyleSheet.create({

  container: {
    paddingTop: 10,
    paddingLeft: 20,
  },
  imgContainer1: {
    elevation: 2,
    height: 110,
    width: 110,
    backgroundColor: '#efefef',
    position: 'relative',
    borderRadius: 999,
    overflow: 'hidden',
  },
  img: {
    width: 100,
    height: 100,
  },

  text: {
    fontWeight: 'bold',
  }
})