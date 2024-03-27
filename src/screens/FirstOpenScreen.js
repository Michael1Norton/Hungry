import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import LoginBackground from "../images/LoginBackground.jpg";

const FirstOpenScreen = () => {
  // Use the useNavigation hook to get the navigation object
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "center" }}>
      <View style={{ paddingHorizontal: 25 }}>
        <View style={{ alignItems: "center" }}>
          <Image source={LoginBackground} style={{ width: 200, height: 200 }} />
        </View>
        <Text
          style={{
            fontSize: 28,
            fontWeight: "bold",
            color: "#120",
            marginBottom: 35,
          }}
        >
          Are you Hungry?
        </Text>
      </View>
      <TouchableOpacity
        style={{
          backgroundColor: "#AD40AF",
          padding: 20,
          width: "90%",
          borderRadius: 10,
          marginBottom: 50,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
        onPress={() => navigation.navigate("LoginScreen")}
      >
        <Text
          style={{
            color: "white",
            fontSize: 18,
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          Let's Begin
        </Text>
        <MaterialIcons name="arrow-forward-ios" size={22} color="#fff" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default FirstOpenScreen;
