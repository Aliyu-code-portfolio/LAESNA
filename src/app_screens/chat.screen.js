import React, { useState, useCallback, useLayoutEffect } from 'react'
import { Text, View, ScrollView, StyleSheet } from 'react-native'
import { GiftedChat } from 'react-native-gifted-chat'
import * as firebase from 'firebase'

//Local imports
import { colors } from '../app_utils/color'
import { paddingSizes } from '../app_utils/sizes'
import { SafeArea } from '../app_utils/safe-area.component'

export const Chat = () => {
  const [messages, setMessages] = useState([]);
  // const [lastMess, setLastMess] = useState([]);
  const uid = firebase.auth().currentUser.uid;


  useLayoutEffect(() => {
    const getMess = firebase.firestore().collection('Users').doc(uid)
      .collection('Chats').orderBy('createdAt', 'desc')
      .onSnapshot(snapshot =>
        setMessages(snapshot.docs.map(doc => ({
          _id: doc.data()._id,
          createdAt: doc.data().createdAt.toDate(),
          text: doc.data().text,
          user: doc.data().user,
        })
        )));

    return getMess;
  }, [])

  const onSend = useCallback((messages = []) => {

    setMessages(previousMessages => GiftedChat.
      append(previousMessages, messages))
    const {
      _id,
      createdAt,
      text,
      user,
    } = messages[0]
    firebase.firestore().collection('Users').doc(uid).collection('Chats').add({
      _id,
      createdAt,
      text,
      user,
    })
  }, [])


  return (
    <SafeArea>
      <GiftedChat
        messages={messages}
        showAvatarForEveryMessage={true}
        onSend={messages => onSend(messages)}
        user={{
          _id: firebase.auth()?.currentUser?.email,
          name: firebase.auth()?.currentUser?.displayName ? firebase.auth().currentUser.displayName : 'Unknown',
          avatar: firebase.auth()?.currentUser?.photoURL ? firebase.auth().currentUser.photoURL : 'https://placeimg.com/140/140/any'
        }} />
    </SafeArea>
  )

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexWrap: "wrap-reverse",
    justifyContent: 'flex-end',
    backgroundColor: '#a5d6a7',
    padding: paddingSizes.sm,
  },

});