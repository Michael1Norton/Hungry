import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import FirstOpenScreen from "../screens/FirstOpenScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import EmailVerificationCodeScreen from "../screens/EmailVerificationCodeScreen";
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen";

const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="FirstOpenScreen" component={FirstOpenScreen} />

      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
      <Stack.Screen
        name="EmailVerificationCodeScreen"
        component={EmailVerificationCodeScreen}
      ></Stack.Screen>
      <Stack.Screen
        name="ForgotPasswordScreen"
        component={ForgotPasswordScreen}
      ></Stack.Screen>
    </Stack.Navigator>
  );
};

export default AuthStack;
