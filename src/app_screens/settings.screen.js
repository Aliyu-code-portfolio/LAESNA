import React,{useState, useEffect} from 'react'
import {Text, View,ImageBackground, StyleSheet, Button, TouchableOpacity} from 'react-native'


import {SafeArea} from '../app_utils/safe-area.component'

export const Settings=({navigation})=>{
    //Information
  const [fname, setfname] = useState('')
  const [lname, setlname] = useState('Abubakar')
  const [age, setage] = useState(27)
  const [econtactname, setecontactname] = useState('Mahmud')
  const [enumber, setenumber] = useState('00000000000')
  const [premed, setpremed] = useState('Yes')
  
  return(
    <SafeArea>
    <ImageBackground
    source= {require("../../assets/bgimg1.png")}
    style={styles.container}>
    <View style={styles.container}>
    <View style={styles.text1container}>
      <Text style={styles.text1}>Settings</Text>
    </View>
    <View style={styles.info}>
      <Text style={styles.allText}>First Name: </Text><Text>{fname}</Text>
      <Text style={styles.allText}>Last Name: </Text><Text>{lname}</Text>
      <Text style={styles.allText}>Age: </Text><Text>{age}</Text>
      <Text style={styles.allText}>Emergency contact Name: </Text><Text>{econtactname}</Text>
      <Text style={styles.allText}>Emergency contact Number: </Text><Text>{enumber}</Text>
      <Text style={styles.allText}>Pre-medical conditions: </Text><Text>{premed}</Text>
    </View>
    <TouchableOpacity>
    <Button title="Edit info" 
    onPress={() => {navigation.navigate("EditScreen")
      }}/>
    </TouchableOpacity>
    </View>
    </ImageBackground>
    </SafeArea>
  )
}
const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'rgba(255,255,255,.1)',
    width:'100%',
    height:'100%',
  },
  text1container:{
    alignItems:'center'
  },
  info:{
    paddingLeft:20,
  },
  allText:{
    color: 'blue',
    fontWeight:'bold',
  }
})