import * as React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/app/routes/appNavigator';
import { Root } from "native-base";
import * as firebase from 'firebase';
import "firebase/auth";
import "firebase/database";
import "firebase/firestore";
import "firebase/functions";
import "firebase/storage";

var firebaseConfig = {
  apiKey: "AIzaSyBEo2t4xBvqxTrIPfXEb8tdcdPvJpZ7r9M",
  authDomain: "meu-aumigao.firebaseapp.com",
  databaseURL: "https://meu-aumigao.firebaseio.com",
  projectId: "meu-aumigao",
  storageBucket: "meu-aumigao.appspot.com",
  messagingSenderId: "5588789116",
  appId: "1:5588789116:web:15f69fee363c15082366f9",
  measurementId: "G-QX04TVE0H0"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

console.disableYellowBox = true;
console.ignoredYellowBox = ['Setting a timer'];

export default function App() {
  return (
    <Root>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar
          barStyle='default'
          hidden
        />
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </SafeAreaView>
    </Root>
  );
}
