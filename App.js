//Libraries
import React from "react";
import { View, StyleSheet } from "react-native";
import { ThemeProvider } from "styled-components/native";

//Local imports
import { theme } from './src/app_infrastructure/theme';

import { AppNavigator } from './src/app_infrastructure/navigation/app_navigation/app.navigation';

export default function App() {

  return (
    <ThemeProvider theme={theme}>
      <View style={styles.overlayContainer}>
        <AppNavigator />
      </View>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  overlayContainer: {
    flex: 1,
    backgroundColor: 'rgba(47,163,218,.4)',
  },
});
