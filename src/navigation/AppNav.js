import React from "react";
import { useContext } from "react";
import { View, ActivityIndicator } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { AuthContext } from "../context/AuthContext";

import AuthStack from "./AuthStack";
import AppStack from "./AppStack";

const AppNav = () => {
  const { isLoading, userData } = useContext(AuthContext);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {userData ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default AppNav;
