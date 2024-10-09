import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import React from "react";
import RepoList from "./features/repolist/RepoList";
import { Provider } from "react-redux";
import { store } from "./store";


export default function Index() {
  return (
    <GestureHandlerRootView style={{ flex: 1, }}>
      <StatusBar style="dark" />
      <Provider store={store}>
        <RepoList />
      </Provider>
    </GestureHandlerRootView>
  );
}
