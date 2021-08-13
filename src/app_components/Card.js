import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform,
  Linking,
} from 'react-native';

import { colors } from '../app_utils/color';
import { marginSizes, fontSizes } from '../app_utils/sizes';

export const Card = ({ name, tel, spacing }) => {
  const addImage = () => {
    if (name === 'Medic') {
      return require('../../assets/medic.png');
    }
    if (name === 'Fire') {
      return require('../../assets/fire.png');
    }
    if (name === 'Security') {
      return require('../../assets/security.png');
    }
  };

  const dialCall = (phone) => {
    let phoneNumber = '';
    if (Platform.OS === 'android') {
      phoneNumber = `tel:${phone}`;
    } else {
      phoneNumber = `telprompt:${phone}`;
    }
    Linking.openURL(phoneNumber);
  };
  return (
    <TouchableOpacity
      onPress={() => {
        dialCall(tel);
      }}>
      <View style={styles(spacing).container}>
        <Image source={addImage()} style={styles(spacing).image} />
        <Text style={styles(spacing).textColor}>{name}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles =(spacing)=> StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: 130,
    backgroundColor: colors.white,
    marginLeft: spacing,
    marginTop: marginSizes.md,
    borderRadius: 10,
    borderColor: colors.red,
    borderWidth: 1,
  },
  textColor:{
    color: 'gray'
  },
  image: {
    width: 50,
    height: 50,
    resizeMode: 'stretch',
  },
});