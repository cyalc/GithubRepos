import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import React from "react";
import App from "./pages/App";


export default function Index() {
  return (

    <GestureHandlerRootView style={
      {
        flex: 1,
      }}>

      <StatusBar style="dark" />

      <App />

    </GestureHandlerRootView>
  );
}
