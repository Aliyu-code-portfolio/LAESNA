import React,{useState, useEffect} from 'react'
import {Text, TextInput, View, StyleSheet, Image, ScrollView,AsyncStorage, TouchableOpacity, Button} from 'react-native'
import {SafeArea} from '../app_utils/safe-area.component'
export const EditScreen=({route})=>{
  
  const [fname, setfname] = useState('Hamza')
  const [lname, setlname] = useState('Abubakar')
  const [age, setage] = useState(27)
  const [econtactname, setecontactname] = useState('Abdul')
  const [enumber, setenumber] = useState('09023109215')
  const [premed, setpremed] = useState('No')
  const [flag, setFlag] = useState(false)
    //React Native bug issuesconst saved = async()=>{}
  
  return(
  <SafeArea>
  <ScrollView>
  <View style={styles.imgContainer}>
    <Image source={require('../../assets/edit.png')} style={styles.img}/>
    <Text style={{paddingTop:10,}}>Edit Your Details</Text>
  </View>
  <View style={styles.container}>
    <View>
      <Text style={styles.text}>First Name: </Text>
      <TextInput style={styles.input}
      onChangeText={(text)=>{
        setfname(text);
      }}>
      </TextInput>
    </View>
    <View>
      <Text style={styles.text}>Last Name: </Text>
      <TextInput style={styles.input}
      onChangeText={(text)=>{
        setlname(text);
      }}>
      </TextInput>
    </View>
    <View>
      <Text style={styles.text}>First Age: </Text>
      <TextInput style={styles.input}
      keyboardType='numeric'
      onChangeText={(text)=>{
        setage(text);
      }}>
      </TextInput>
    </View>
    <View>
      <Text style={styles.text}>Emergency contact: </Text>
      <TextInput style={styles.input}
      onChangeText={(text)=>{
        setecontactname(text);
      }}>
      </TextInput>
    </View>
    <View>
      <Text style={styles.text}>First Contact Number: </Text>
      <TextInput style={styles.input}
      keyboardType='numeric'
      onChangeText={(text)=>{
        setenumber(text);
      }}>
      </TextInput>
    </View>
    <View>
      <Text style={styles.text}>First Pre medical condition: </Text>
      <TextInput style={styles.input}
      onChangeText={(text)=>{
        setpremed(text);
      }}>
      </TextInput>
    </View>
  </View>
  <View style={{paddingTop:20}}>
    <TouchableOpacity
      >
    <Button title="Confirm changes" 
    onPress={() => {console.log('I did')}
      }/>
    </TouchableOpacity>
    </View>
  </ScrollView>
  </SafeArea>
  )
  
}
const styles = StyleSheet.create({
  imgContainer:{
    alignItems:'center',
  },
  img:{
    width: 100,
    height: 100,
  },
  container:{
    paddingTop: 10,
    paddingLeft: 20,
  },
  input:{
    borderWidth: 1,
    borderColor: 'blue',
    width: 300,
  },
  text:{
    fontWeight: 'bold',
  }
})