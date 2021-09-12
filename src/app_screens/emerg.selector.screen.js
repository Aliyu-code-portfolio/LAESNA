import React, { useState, useEffect, useContext } from 'react'
import { Text, View, StyleSheet, Image, Alert, TouchableOpacity, Vibration } from 'react-native'
import ConnectivityManager from "react-native-connectivity-status"
//import LocationEnabler from 'react-native-location-enabler';
import Expo from 'expo';

//import { ActivityIndicator, Colors } from "react-native-paper";
import {
  BallIndicator,
} from 'react-native-indicators';

import { Countdown } from '../app_components/countdown.timer'
import { getDeviceID, getLocation } from '../app_services/location.services/location.scan'
import { FirebaseContext } from '../app_services/firebase.services/firebase'
import { fontSizes } from '../app_utils/sizes'

export const EmergencySelector = ({ navigation }) => {
  const { sendTrackingData, displayCountDown } = useContext(FirebaseContext)
  const [indicator, setIndicator] = useState(false);
  const [time, setTime] = useState(null);

  const sendDistress = async (emergency) => {
    setIndicator(true);
    // Alert.alert(
    //   "Sent Your Request",
    //   "Your location have been sent to " + emergency + " dapartment. Please stay in this screen to get an expected time of arrival",
    //   [
    //     {
    //       text: "Ok",
    //       style: "cancel",
    //       onPress: () => {
    //         displayCountDown(emergency, getETA);
    //       }
    //     }
    //   ]
    // );
    const myDevice = getDeviceID();
    getLocation(processData, myDevice, emergency);

  }
  const processData = (locateData, device, emg) => {
    console.log(locateData)
    if (locateData.coords) {
      const latitude = locateData.coords.latitude
      const longitude = locateData.coords.longitude
      const status = sendTrackingData(device, emg, latitude, longitude);
      //Simple display confirming help is coming
      if (status) {
        setIndicator(false);
        Alert.alert(
          "Sent Your Request",
          "Your location have been sent to " + emg + " dapartment. Please stay in this screen to get an expected time of arrival",
          [
            {
              text: "Ok",
              style: "cancel",
              onPress: () => {
                displayCountDown(emg, getETA);
              }
            }
          ]
        );

      }

    }
    else {
      setIndicator(false);
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
  }

  const vibrate = () => {
    if (Platform.OS === 'ios') {
      const interval = setInterval(() => Vibration.vibrate(), 40);
      setTimeout(() => clearInterval(interval), 1000);
    } else {
      Vibration.vibrate(40);
    }
  };

  const getETA = (eta) => {
    setTime(parseInt(eta));
  }
  const onCountEnd = () => {
    navigation.goBack()
  }

  return (

    <View style={styles.container}>{time ? (<Countdown minutes={time} onEnd={onCountEnd} />)

      :

      (<><View style={{ width: '3%', height: '3%', paddingBottom: 20 }}>
        <BallIndicator color='orange' size={25} animating={indicator} />
      </View>
        <Text style={{ paddingBottom: 10, fontWeight: 'bold', fontSize: fontSizes.lg }} >Choose</Text>
        <View>
          <View style={styles.imgContainer}>
            <TouchableOpacity onPress={() => sendDistress('Security')}
            >
              <Image source={require('../../assets/security.png')} style={styles.img} />
              <Text style={{ paddingTop: 10, textAlign: 'center', fontWeight: 'bold' }}>Security</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.imgContainer}>
            <TouchableOpacity onPress={() => sendDistress('Medical')}
            >
              <Image source={require('../../assets/medic.png')} style={styles.img} />
              <Text style={{ paddingTop: 10, textAlign: 'center', fontWeight: 'bold' }}>Medic</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.imgContainer}>
            <TouchableOpacity onPress={() => sendDistress('Fire')}
            >
              <Image source={require('../../assets/fire.png')} style={styles.img} />
              <Text style={{ paddingTop: 10, textAlign: 'center', fontWeight: 'bold' }}>Fire</Text>
            </TouchableOpacity>
          </View>
        </View>
      </>)}

    </View>
  )
}
const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 5,
    backgroundColor: '#efefef',
  },
  imgContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    elevation: 16,
    height: 110,
    width: 110,
    backgroundColor: 'white',
    position: 'relative',
    borderRadius: 10,
    borderColor: 'black',
    overflow: 'hidden',
  },
  img: {
    width: 70,
    height: 70,
    resizeMode: 'stretch',
  },
  text: {
    fontWeight: 'bold',
  }
})