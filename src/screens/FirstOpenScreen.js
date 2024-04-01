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
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "beige",
      }}
    >
      {/* Logo with colored rings */}
      <View style={{ position: "relative", marginBottom: 50 }}>
        <View
          style={{
            position: "absolute",
            width: 150,
            height: 150,
            borderRadius: 75,
            borderWidth: 10,
            borderColor: "red", // Change color as needed
          }}
        ></View>
        <View
          style={{
            position: "absolute",
            width: 120,
            height: 120,
            borderRadius: 60,
            borderWidth: 10,
            borderColor: "blue", // Change color as needed
            marginTop: 15,
            marginLeft: 15,
          }}
        ></View>
        <Image
          source={LoginBackground}
          style={{ width: 100, height: 100 }}
          resizeMode="contain"
        />
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
          Let's Eat!
        </Text>
        <MaterialIcons name="arrow-forward-ios" size={22} color="#fff" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default FirstOpenScreen;
