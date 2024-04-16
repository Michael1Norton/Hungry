import React, { useState } from "react";
import { Image } from "react-native";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import appIcon from "../images/icon-192.png";
import InputField from "../components/inputField";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const ForgotPasswordScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [confirmationNumber, setConfirmationNumber] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleResetPassword = async () => {
    try {
      console.log("Start Resetting Password...");

      // API Request to confirmation code
      const response = await fetch(
        "http://culinary-canvas-express.com:80/Email-Confirmation-number",
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

        // Now, reset the password
        const resetResponse = await fetch(
          "http://culinary-canvas-express.com:80/reset-password",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, newPassword }),
          }
        );

        const resetData = await resetResponse.json();

        if (resetResponse.ok) {
          // Password reset successful
          console.log("Password reset successful:", resetData);
          Alert.alert("Password Reset Successful", resetData.message);
          navigation.navigate("LoginScreen");
        } else {
          // Password reset failed
          console.log("Password reset failed:", resetData);
          let errorMessage = resetData.message || "Error resetting password.";
          Alert.alert("Password Reset Failed", errorMessage);
        }
      } else {
        // Verification failed
        console.log("Verification failed:", data);
        let errorMessage = data.message || "Invalid confirmation number.";
        Alert.alert("Verification failed", errorMessage);
      }
    } catch (error) {
      console.error("Error trying to reset password: ", error);
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
        Reset Password
      </Text>
      <View
        style={{
          backgroundColor: "#FFF",
          padding: hp(0.8),
          borderRadius: 15,
          marginBottom: hp(0.8),
          width: wp(90),
        }}
      >
        <InputField
          label={"Enter Username"}
          icon={
            <MaterialIcons
              name="person"
              size={24}
              color="#120"
              style={{ marginRight: 5 }}
            />
          }
          inputType={"text"}
          value={username}
          onTextChange={setUsername}
        />
      </View>
      <View
        style={{
          backgroundColor: "#FFF",
          padding: hp(0.8),
          borderRadius: 15,
          marginBottom: hp(0.8),
          width: wp(90),
        }}
      >
        <InputField
          label={"Enter Confirmation Number"}
          icon={
            <MaterialIcons
              name="lock"
              size={24}
              color="#120"
              style={{ marginRight: 5 }}
            />
          }
          inputType={"text"}
          value={confirmationNumber}
          onTextChange={setConfirmationNumber}
        />
      </View>

      <View
        style={{
          backgroundColor: "#FFF",
          padding: hp(0.8),
          borderRadius: 15,
          marginBottom: hp(0.8),
          width: wp(90),
        }}
      >
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
          value={newPassword}
          onTextChange={setNewPassword}
        />
      </View>

      <View
        style={{
          backgroundColor: "#FFF",
          padding: hp(0.8),
          borderRadius: 15,
          marginBottom: hp(0.8),
          width: wp(90),
        }}
      >
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
      </View>
      <Text
        style={{
          fontSize: hp(1.75),
          fontWeight: "bold",
          color: "grey",
          marginBottom: hp(5),
          width: wp(70),
        }}
      >
        Password must be at least 7 characters long and include a special
        character.
      </Text>
      <TouchableOpacity
        style={{
          backgroundColor: "#6B240C",
          padding: hp(1),
          borderRadius: 15,
          width: wp(50),
          alignItems: "center",
        }}
        onPress={handleResetPassword}
      >
        <Text style={{ color: "white", fontSize: hp(2) }}>Reset Password</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ForgotPasswordScreen;
