import React, { useState, useEffect } from 'react'
import { Text, View, ImageBackground, StyleSheet, Button, TouchableOpacity } from 'react-native'

import { ProfileImage } from '../app_components/profile.image'
import { SafeArea } from '../app_utils/safe-area.component'

export const Settings = () => {
  //Information
  const [fname, setfname] = useState('Hamza')
  const [lname, setlname] = useState('Abubakar')
  const [age, setage] = useState(27)
  const [econtactname, setecontactname] = useState('Mahmud')
  const [enumber, setenumber] = useState('00000000000')
  const [premed, setpremed] = useState('Yes')

  return (
    <SafeArea>
      <View style={styles.container}>
        <View style={styles.picture}>
          <ProfileImage />
          <Text style={{ marginVertical: 20, fontSize: 16, fontWeight: 'bold' }}>{fname + ' ' + lname}</Text>
        </View>
        <View style={styles.curve}>
          <View style={styles.info}>
            <Text style={styles.allText}>Age: </Text><Text style={styles.innerText}>{age}</Text>
            <Text style={styles.allText}>Emergency contact Name: </Text><Text style={styles.innerText}>{econtactname}</Text>
            <Text style={styles.allText}>Emergency contact Number: </Text><Text style={styles.innerText}>{enumber}</Text>
            <Text style={styles.allText}>Pre-medical conditions: </Text><Text style={styles.innerText}>{premed}</Text>
          </View>
        </View>
      </View>
    </SafeArea>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f8ff',
    width: '100%',
    height: '100%',
  },
  text1container: {
    alignItems: 'center'
  },
  picture: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  curve: {
    paddingTop: 20,
    alignItems: 'center',
    backgroundColor: '#ffa500',
    height: 500,
    borderRadius: 60
  },
  info: {
    paddingLeft: 20,

  },
  allText: {
    color: 'blue',
    alignItems: 'center',
    textAlign: 'center',
    fontWeight: 'bold',
    paddingBottom: 5
  },
  innerText: {
    textAlign: 'center',
    paddingBottom: 15
  }
})
