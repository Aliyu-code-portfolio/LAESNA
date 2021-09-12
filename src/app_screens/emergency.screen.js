import React, { useEffect } from 'react'
import {
  Text,
  View,
  ImageBackground,
  StyleSheet,
  Platform,
  Vibration,
  Alert,
  TouchableWithoutFeedback,
} from 'react-native';
import LottieView from "lottie-react-native";
import * as Location from 'expo-location';
import NetInfo from "@react-native-community/netinfo";



//import from local files
import { Card } from '../app_components/Card';
import { SafeArea } from '../app_utils/safe-area.component'
import { fontSizes, marginSizes } from '../app_utils/sizes';

export const EmergencyScreen = ({ navigation }) => {


  const checkInternet = async () => {
    const response = await NetInfo.fetch();
    if (response.isConnected) {
      vibrate()
      navigation.navigate("EmergencySelector")
    }
    else {
      Alert.alert(
        "No internet",
        "It appears you don't have an internet connection, Try again",
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
      const interval = setInterval(() => Vibration.vibrate(), 400);
      setTimeout(() => clearInterval(interval), 1000);
    } else {
      Vibration.vibrate(400);
    }
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
    })();
  }, []);

  return (
    <SafeArea>
      <ImageBackground
        source={require("../../assets/bgimg1.png")}
        style={styles.container}>
        <View style={styles.containerOver}>
          <View style={styles.textsContainer1}>
            <Text style={styles.textTitle}> Emergency help needed?</Text>
            <Text style={styles.text}>
              Just press and hold the animated button to send your distress signal
        </Text>
          </View>
          <View style={styles.animated}>
            <TouchableWithoutFeedback
              onLongPress={() => {
                checkInternet()
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
    </SafeArea>
  );
}
//work on Oswald_400Regular here
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
    paddingTop: 10,
  },
  textsContainer1: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  textTitle: {
    margin: marginSizes.xsm,
    marginBottom: marginSizes.sm,
    fontFamily: 'Oswald_400Regular',

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
