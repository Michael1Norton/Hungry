import React from "react";
import { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import CustomButton from "../components/CustomButton";
import InputField from "../components/inputField";
import LoginBackground from "../images/LoginBackground.jpg";
import GoogleImage from "../images/google.svg.png";
import InstagramImage from "../images/Instagram_logo_2016.svg.webp";
import XImage from "../images/X-logo.jpg";

const LoginScreen = ({ navigation }) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      // API Request to login
      const response = await fetch("http://10.0.2.2:4000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userName, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Login successful
        console.log(data);
        navigation.navigate("LandingScreen");
      } else {
        // Login failed
        console.log(data);
        Alert.alert("Login failed");
      }
    } catch (error) {
      console.error("Error trying to log in: ", error);
      Alert.alert("Error", "An unexpected error occurred. Please try again.");
    }
  };

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

        <InputField
          label={"Username"}
          icon={
            <MaterialIcons
              name="person"
              size={24}
              color="#120"
              style={{ marginRight: 5 }}
            />
          }
          value={userName}
          onChangeText={setUserName}
        />
        <InputField
          label={"Password"}
          icon={
            <MaterialIcons
              name="password"
              size={24}
              color="#120"
              style={{ marginRight: 5 }}
            />
          }
          inputType={"password"}
          value={password}
          onChangeText={setPassword}
          fieldButton={"Forgot?"}
          fieldButtonAction={() => {}}
        />

        <CustomButton title={"Login"} onPress={handleLogin} />

        <Text style={{ textAlign: "center", color: "grey", marginBottom: 30 }}>
          Or login with ...
        </Text>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 10,
          }}
        >
          <TouchableOpacity
            onPress={() => {}}
            style={{
              borderColor: "#ddd",
              borderWidth: 2,
              borderRadius: 10,
              paddingHorizontal: 30,
              paddingVertical: 10,
            }}
          >
            <Image source={GoogleImage} style={{ width: 30, height: 30 }} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {}}
            style={{
              borderColor: "#ddd",
              borderWidth: 2,
              borderRadius: 10,
              paddingHorizontal: 30,
              paddingVertical: 10,
            }}
          >
            <Image source={XImage} style={{ width: 30, height: 30 }} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {}}
            style={{
              borderColor: "#ddd",
              borderWidth: 2,
              borderRadius: 10,
              paddingHorizontal: 30,
              paddingVertical: 10,
            }}
          >
            <Image source={InstagramImage} style={{ width: 30, height: 30 }} />
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginBottom: 30,
            marginTop: 10,
          }}
        >
          <Text>New to the app? </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("RegisterScreen")}
          >
            <Text style={{ color: "orange", fontWeight: "bold" }}>
              Register
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
