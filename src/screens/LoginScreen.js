import React from "react";
import { SafeAreaView, View, Text, Image } from "react-native";

import LoginBackground from "../images/LoginBackground.jpg";

const LoginScreen = () => {
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
          Login
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
