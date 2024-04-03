import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "../screens/HomeScreen";
import LandingScreen from "../screens/LandingScreen";
import RecipeInfoScreen from "../screens/RecipeInfoScreen";

const Stack = createStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="RecipeInfoScreen" component={RecipeInfoScreen} />
      <Stack.Screen name="LandingScreen" component={LandingScreen} />
    </Stack.Navigator>
  );
};

export default AppStack;
