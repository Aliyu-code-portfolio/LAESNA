//Libraries
import React from "react";
import * as firebase from 'firebase';
import 'firebase/firestore';
import { ThemeProvider } from "styled-components/native";
import {
  useFonts as useOswald,
  Oswald_400Regular,
} from "@expo-google-fonts/oswald";


//Local imports
import { theme } from './src/app_infrastructure/theme';
import { AuthenticationContextProvider } from './src/app_services/authentication.service/authentication.context'
import { FirebaseContextProvider } from './src/app_services/firebase.services/firebase'
import { Navigation } from './src/app_infrastructure/navigation/account_navigation/account.navigation/index';


const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: ""
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default function App() {
  const [oswaldLoaded] = useOswald({
    Oswald_400Regular,
  });
  if (!oswaldLoaded) {
    return null;
  }

  return (
    <ThemeProvider theme={theme}>
      <FirebaseContextProvider>
        <AuthenticationContextProvider>
          <Navigation />
        </AuthenticationContextProvider>
      </FirebaseContextProvider>
    </ThemeProvider>
  );
}

