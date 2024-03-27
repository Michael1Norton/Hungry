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

const RegisterScreen = ({ navigation }) => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async () => {
    try {
      console.log("Registering...");
      console.log("Username:", userName || "N/A");
      console.log("Email:", email || "N/A");
      console.log("Phone Number:", phoneNumber);
      console.log("Password:", password);
      console.log("Confirm Password:", confirmPassword);

      // make sure passwords match
      if (password !== confirmPassword) {
        console.log("Passwords do not match");
        Alert.alert("Passwords do not match. Please try again.");
        return;
      }

      // API Request to register
      const response = await fetch("http://10.0.2.2:4000/api/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName,
          email,
          phoneNum: phoneNumber,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Registration successful
        console.log(data);
        navigation.navigate("LoginScreen");
      } else {
        // Registration failed
        console.log(data);
        Alert.alert("Registration failed", data.message);
      }
    } catch (error) {
      console.error("Error trying to register: ", error);
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
          Register
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

        <Text style={{ textAlign: "center", color: "grey", marginBottom: 30 }}>
          Or Register With Email
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
          onTextChange={setUserName}
        />

        <InputField
          label={"Email Address"}
          icon={
            <MaterialIcons
              name="alternate-email"
              size={24}
              color="#120"
              style={{ marginRight: 5 }}
            />
          }
          keyboardType={"email-address"}
          value={email}
          onTextChange={setEmail}
        />

        <InputField
          label={"Phone Number"}
          icon={
            <MaterialIcons
              name="smartphone"
              size={24}
              color="#120"
              style={{ marginRight: 5 }}
            />
          }
          keyboardType={"numeric"}
          value={phoneNumber}
          onTextChange={setPhoneNumber}
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
          onTextChange={setPassword}
        />

        <InputField
          label={"Confirm Password"}
          icon={
            <MaterialIcons
              name="password"
              size={24}
              color="#120"
              style={{ marginRight: 5 }}
            />
          }
          inputType={"password"}
          value={confirmPassword}
          onTextChange={setConfirmPassword}
        />

        <CustomButton title={"Register"} onPress={handleRegister} />

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginBottom: 30,
            marginTop: 0,
          }}
        >
          <Text>Already Registered? </Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={{ color: "orange", fontWeight: "bold" }}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default RegisterScreen;
