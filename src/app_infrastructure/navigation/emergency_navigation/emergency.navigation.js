import React from 'react';
import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';
import 'react-native-gesture-handler';

import { EmergencyScreen } from '../../../app_screens/emergency.screen';
import { EmergencySelector } from '../../../app_screens/emerg.selector.screen';
const SelectorStack = createStackNavigator();

export const EmergencyNavigator = () => {
  return (
    <SelectorStack.Navigator

      screenOptions={{
        ...TransitionPresets.ModalPresentationIOS,
        headerShown: false
      }}
    >
      <SelectorStack.Screen name="Emergency" component={EmergencyScreen} />
      <SelectorStack.Screen name="EmergencySelector" component={EmergencySelector} />
    </SelectorStack.Navigator>
  );
};
