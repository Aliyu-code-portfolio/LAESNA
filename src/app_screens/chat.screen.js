import React, { useState, useEffect, useCallback } from 'react'
import { Text, View, ScrollView, StyleSheet } from 'react-native'
import { Searchbar } from "react-native-paper";
import { GiftedChat } from 'react-native-gifted-chat'

//Local imports
import { colors } from '../app_utils/color'
import { paddingSizes } from '../app_utils/sizes'
import { SafeArea } from '../app_utils/safe-area.component'

export const Chat = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Ask me anything related to emergency and i will repond swiftly',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'Responder',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ])
  }, [])

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
  }, [])

  //This sends the chat to a responder
  const sendMessage = (chat) => {
    console.log(chat)
  }

  return (
    <SafeArea>
      <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
          _id: 1,
        }} />
    </SafeArea>
  )

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexWrap: "wrap-reverse",
    justifyContent: 'flex-end',
    backgroundColor: colors.cornsilk,
    padding: paddingSizes.sm,
  },

});