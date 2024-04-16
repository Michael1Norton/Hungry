import React, { useState } from "react";
import { Image } from "react-native";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import appIcon from "../images/icon-192.png";

const EmailVerificationScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [confirmationNumber, setConfirmationNumber] = useState("");

  const handleVerification = async () => {
    try {
      console.log("Verifying email...");
      console.log("Username:", username);
      console.log("Confirmation Number:", confirmationNumber);

      // API Request to verify email
      const response = await fetch(
        "http://culinary-canvas-express.com:40/confirmation-number",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, numberEntered: confirmationNumber }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        // Verification successful
        console.log("Verification successful:", data);
        Alert.alert(
          "Email Verified",
          "Your email has been successfully verified."
        );
        navigation.navigate("LoginScreen");
      } else {
        // Verification failed
        console.log("Verification failed:", data);
        let errorMessage = data.message || "Invalid confirmation number.";
        Alert.alert("Verification failed", errorMessage);
      }
    } catch (error) {
      console.error("Error trying to verify email: ", error);
      Alert.alert("Error", "An unexpected error occurred. Please try again.");
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FEECE2",
      }}
    >
      <Image
        source={require("../images/background.png")}
        style={{ position: "absolute", width: wp(100), height: hp(100) }}
      />
      <View style={{ paddingTop: 0, paddingBottom: hp(5) }}>
        <Image source={appIcon} style={{ width: hp(22), height: hp(22) }} />
      </View>
      <Text
        style={{
          fontSize: hp(3),
          fontWeight: "bold",
          color: "black",
          marginBottom: hp(2),
        }}
      >
        Email Verification
      </Text>
      <TextInput
        style={{
          backgroundColor: "#FFF",
          padding: hp(1),
          borderRadius: 15,
          marginBottom: hp(2),
          width: wp(70),
        }}
        placeholder="Enter Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={{
          backgroundColor: "#FFF",
          padding: hp(1),
          borderRadius: 15,
          marginBottom: hp(2),
          width: wp(70),
        }}
        placeholder="Enter Confirmation Number"
        value={confirmationNumber}
        onChangeText={setConfirmationNumber}
      />
      <TouchableOpacity
        style={{
          backgroundColor: "#6B240C",
          padding: hp(1),
          borderRadius: 15,
          width: wp(50),
          alignItems: "center",
        }}
        onPress={handleVerification}
      >
        <Text style={{ color: "white", fontSize: hp(2) }}>Verify Email</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EmailVerificationScreen;
