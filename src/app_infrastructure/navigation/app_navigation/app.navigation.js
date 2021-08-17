import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from "@react-navigation/native";

import { Settings } from '../../../app_screens/settings.screen'
import { Chat } from '../../../app_screens/chat.screen'
import { EmergencyNavigator } from '../emergency_navigation/emergency.navigation'


const Tab = createBottomTabNavigator()
const TAB_ICON = {
  Home: 'git-pull-request-outline',
  Chat: 'chatbox-ellipses-outline',
  Settings: 'settings-outline',
};

const createScreenOptions = ({ route }) => {
  const iconName = TAB_ICON[route.name];
  return {
    tabBarIcon: ({ size, color }) => (
      <Ionicons name={iconName} size={size} color={color} />
    ),
  };
};

export const AppNavigator = () => (
  <NavigationContainer>
    <Tab.Navigator
      screenOptions={createScreenOptions}
      tabBarOptions={{
        activeTintColor: 'red',
        inactiveTintColor: 'gray',
      }}>
      <Tab.Screen name="Home" component={EmergencyNavigator} />
      <Tab.Screen name="Chat" component={Chat} options={{ headerShown: false }} />
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  </NavigationContainer>
)