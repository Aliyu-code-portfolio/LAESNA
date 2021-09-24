import React, { useState, useEffect, useContext } from 'react'
import { Text, View, Dimensions, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons';


import { AuthenticationContext } from '../app_services/authentication.service/authentication.context'
import { FirebaseContext } from '../app_services/firebase.services/firebase'
import { ProfileImage } from '../app_components/profile.image'
import { SafeArea } from '../app_utils/safe-area.component'

export const Settings = () => {
  const { onLogout } = useContext(AuthenticationContext);
  const { getInfo } = useContext(FirebaseContext);
  //Information

  const [fname, setfname] = useState('Please wait...')
  const [age, setage] = useState('Please wait...')
  const [econtactname, setecontactname] = useState('Please wait...')
  const [enumber, setenumber] = useState('Please wait...')
  const [premed, setpremed] = useState('Please wait...')

  const processData = (info) => {
    setfname(info[0])
    setage(info[1])
    setecontactname(info[2])
    setenumber(info[3])
    setpremed(info[4])
  }

  useEffect(() => {
    getInfo(processData)
  }, [])
  return (
    <SafeArea>
      <View style={styles.container}>
        <View style={styles.pictureLogout}>
          <View>
            <ProfileImage />
            <Text style={{ textAlign: 'center', marginVertical: 20, fontSize: 16, fontWeight: 'bold' }}>{fname}</Text>
          </View>
          <View style={{ position: 'absolute', top: 0, right: 0, elevation: 40, padding: 10 }}>
            <TouchableOpacity style={{ borderRadius: 10, width: 45, }}
              onPress={() => {
                onLogout()
              }}>
              <Ionicons name='log-out-outline' size={40} color='red' />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.curve}>
          <View style={styles.info}>
            <View style={styles.pair}>
              <View style={styles.imgContainer}>
                <Text style={{ textAlign: 'center', fontWeight: 'bold', color: 'black', paddingBottom: 3 }}>My Age:</Text>
                <TouchableOpacity
                >
                  <Text style={{ textAlign: 'center', fontWeight: 'bold', color: 'white' }}>{age}</Text>
                </TouchableOpacity
                >
              </View>
              <View style={styles.imgContainer}>
                <Text style={{ textAlign: 'center', fontWeight: 'bold', color: 'black', paddingBottom: 3 }}>Next of Kin:</Text>
                <TouchableOpacity
                >
                  <Text style={{ textAlign: 'center', fontWeight: 'bold', color: 'white' }}>{econtactname}</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.pair}>
              <View style={styles.imgContainer}>
                <Text style={{ textAlign: 'center', fontWeight: 'bold', color: 'black', paddingBottom: 3 }}>Next of Kin Number:</Text>
                <TouchableOpacity
                >

                  <Text style={{ textAlign: 'center', fontWeight: 'bold', color: 'white' }}>{enumber}</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.imgContainer}>
                <Text style={{ textAlign: 'center', fontWeight: 'bold', color: 'black', paddingBottom: 3 }}>Have pemedical conditions:</Text>
                <TouchableOpacity
                >
                  <Text style={{ paddingTop: 10, textAlign: 'center', fontWeight: 'bold', color: 'white' }}>{premed}</Text>
                </TouchableOpacity>
              </View>
            </View>

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
  pictureLogout: {
    paddingTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  curve: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'green',
    height: Dimensions.get('window').height * 0.8,
    borderTopEndRadius: 50
  },
  imgContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    elevation: 60,
    height: 130,
    width: 100,
    backgroundColor: '#c3cdd6',
    position: 'relative',
    borderRadius: 8,
    overflow: 'hidden',
  },
  pair: {
    flexDirection: 'row'
  },
  info: {

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
