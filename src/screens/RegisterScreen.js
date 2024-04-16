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
import appIcon from "../images/icon-192.png";
import CustomButton from "../components/CustomButton";
import InputField from "../components/inputField";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const RegisterScreen = ({ navigation }) => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async () => {
    try {
      console.log("Registering...");
      console.log("Username:", userName || "N/A");
      console.log("Password:", password);
      console.log("Confirm Password:", confirmPassword);
      console.log("Email:", email || "N/A");

      // make sure passwords match
      if (password !== confirmPassword) {
        console.log("Passwords do not match");
        Alert.alert("Passwords do not match. Please try again.");
        return;
      }

      // API Request to register
      const response = await fetch(
        "http://culinary-canvas-express.com:40/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: userName,
            password,
            email,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        // Registration successful
        console.log(data);
        navigation.navigate("EmailVerificationCodeScreen");
      } else {
        // Registration failed
        console.log(data);
        let errorMessage = data.message || "Registration failed.";
        Alert.alert("Registration failed", errorMessage);
      }
    } catch (error) {
      console.error("Error trying to register: ", error);
      Alert.alert("Error", "An unexpected error occurred. Please try again.");
    }
  };

  return (
    <SafeAreaView
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
      <View style={{ paddingTop: 0, paddingBottom: hp(2) }}>
        <Image source={appIcon} style={{ width: hp(22), height: hp(22) }} />
      </View>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Text
          style={{
            fontSize: hp(3),
            fontWeight: "bold",
            color: "black",
            marginBottom: hp(1.5),
          }}
        >
          Create Your Account
        </Text>
        <Text
          style={{
            fontSize: hp(2),
            fontWeight: "bold",
            color: "grey",
            marginBottom: hp(2),
          }}
        >
          Find your favorite recipes from around the world!
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
            marginBottom: hp(2),
            width: wp(90),
          }}
        >
          Password must be at least 7 characters long and include a special
          character.
        </Text>

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
          <TouchableOpacity
            style={{ borderBottomWidth: 1, borderBottomColor: "#6B240C" }}
            onPress={() => navigation.goBack()}
          >
            <Text style={{ color: "#6B240C", fontWeight: "bold" }}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default RegisterScreen;
