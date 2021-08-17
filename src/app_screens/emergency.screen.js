import React, { useEffect } from 'react'
import {
  Text,
  View,
  ImageBackground,
  StyleSheet,
  Platform,
  Vibration,
  TouchableWithoutFeedback,
} from 'react-native';
import LottieView from "lottie-react-native";
import * as Permissions from 'expo-permissions';


//import from local files
import { Card } from '../app_components/Card';
import { SafeArea } from '../app_utils/safe-area.component'
import { fontSizes, paddingSizes, marginSizes } from '../app_utils/sizes';

export const EmergencyScreen = ({ navigation }) => {

  const getPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION)
    if (status !== 'granted') {
      //Pop up showing a warning here and checks for null below.
      console.log('PERMISSION NOT GRANTED')
      return null;
    }
  }

  const vibrate = () => {
    if (Platform.OS === 'ios') {
      const interval = setInterval(() => Vibration.vibrate(), 400);
      setTimeout(() => clearInterval(interval), 1000);
    } else {
      Vibration.vibrate(400);
    }
  };

  useEffect(() => {
    getPermission()
  }, [])
  return (
    <ImageBackground
      source={require("../../assets/bgimg1.png")}
      style={styles.container}>
      <View style={styles.containerOver}>
        <View style={styles.textsContainer1}>
          <Text style={styles.textTitle}> Emergency help needed?</Text>
          <Text style={styles.text}>
            Just press and hold the button to send your distress signal
        </Text>
        </View>
        <View style={styles.animated}>
          <TouchableWithoutFeedback
            onLongPress={() => {
              vibrate()
              navigation.navigate("EmergencySelector")
            }}>
            <LottieView
              source={require("../../assets/button.json")}
              key="animation"
              autoPlay
              resizeMode='contain'
              loop
            />
          </TouchableWithoutFeedback>
        </View>
        <View>
          <Text style={styles.textTitle2}>Prefer to call and talk?</Text>
          <Text style={styles.text2}>
            Pick the response team that fits your emergency
        </Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          <Card name="Security" tel="09031335884" spacing={0} />
          <Card name="Medic" tel="08052604937" spacing={24} />
          <Card name="Fire" tel="08050799378" spacing={24} />
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  containerOver: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,.1)',
    width: '100%',
    height: '100%',
  },
  textsContainer1: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  textTitle: {
    margin: marginSizes.xsm,
    marginBottom: marginSizes.sm,
    fontSize: fontSizes.lg,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  textTitle2: {
    fontSize: fontSizes.smd,
    textAlign: 'center',
  },
  text: {
    fontSize: fontSizes.smd,
    textAlign: 'center',
    color: "gray",
  },
  text2: {
    fontSize: fontSizes.sm,
    textAlign: 'center',
    color: "gray",
  },

  animated: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '50%',
  },
});
