import React from 'react';
import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';
import 'react-native-gesture-handler';

import { Settings } from '../../../app_screens/settings.screen';
import { EditScreen } from '../../../app_screens/edits.screen';
const SettingsStack = createStackNavigator();

export const SettingsNavigator = () => {
  return (
    <SettingsStack.Navigator
      headerMode="none"
      screenOptions={{
        ...TransitionPresets.ModalPresentationIOS,
      }}
    >
      <SettingsStack.Screen name="Details" component={Settings} />
      <SettingsStack.Screen name="EditScreen" component={EditScreen} />
    </SettingsStack.Navigator>
  );
};
