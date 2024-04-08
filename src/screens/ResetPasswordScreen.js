import React from "react";
import { useState } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  Button,
  SafeAreaView,
} from "react-native";
import { AuthContext } from "../context/AuthContext";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import InputField from "../components/inputField";
import { Alert } from "react-native";

const ResetPasswordScreen = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigation = useNavigation(); // Initialize useNavigation hook

  const handleResetPassword = async () => {
    console.log("Resetting password...");
    if (!userName || !password || !confirmPassword) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }
    try {
      const response = await fetch(
        "http://10.0.2.2:3000/api/users/reset-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: userName,
            newPassword: password,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        console.log(data);
        Alert.alert("Success", "Password reset successfully");
        navigation.goBack();
      } else {
        console.log(data);
        Alert.alert("Error", data.message);
      }
    } catch (error) {
      console.error("Error when resetting password", error);
      Alert.alert("Error", "An error occurred. Please try again later.");
    }
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F5CCA0" }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: hp(2),
          paddingTop: hp(5),
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ backgroundColor: "white", borderRadius: 20 }}
        >
          <MaterialIcons name="chevron-left" size={hp(4)} color="black" />
        </TouchableOpacity>
      </View>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginBottom: hp(1.5),
        }}
      >
        <Image
          source={require("../images/profilePic.png")}
          style={{ height: hp(22), width: hp(22), borderRadius: hp(5) }}
        />

        <Text className="font-semibold" style={{ marginBottom: hp(2) }}>
          Please enter your username and new password below
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
            label={"New Password"}
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
            label={"Confirm New Password"}
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

        <TouchableOpacity
          style={{
            backgroundColor: "#FF9F45",
            padding: 10,
            borderRadius: 5,
            alignItems: "center",
            marginTop: hp(2),
          }}
          onPress={handleResetPassword}
        >
          <Text style={{ fontWeight: "bold" }}>Reset Password</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ResetPasswordScreen;
