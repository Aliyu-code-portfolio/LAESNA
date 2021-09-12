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
  apiKey: "AIzaSyC5JP7q6d4M21jrcA7R1zh6-NgtFlQMMBI",
  authDomain: "laesna-d7c83.firebaseapp.com",
  projectId: "laesna-d7c83",
  storageBucket: "laesna-d7c83.appspot.com",
  messagingSenderId: "955485269180",
  appId: "1:955485269180:web:14aab9eb2f5901441ab4b9",
  measurementId: "G-HKHC0TB3WJ"
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

