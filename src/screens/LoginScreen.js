import React from "react";
import { useState, useContext } from "react";
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
import { AuthContext } from "../context/AuthContext";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const LoginScreen = ({ navigation }) => {
  const { login } = useContext(AuthContext);

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      console.log("Logging in...");
      console.log("Username:", userName || "N/A");
      console.log("Password:", password);

      console.log(JSON.stringify({ userName, password }));
      // API Request to login
      const response = await fetch("http://10.0.2.2:3000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: userName, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Login successful
        console.log("What is the data:", data);
        console.log("Token only:", data.token);
        const token = data.token;
        login(token);
        //navigation.navigate("AppStack");
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

  const handleForgotPassword = async () => {
    try {
      console.log("Forgot Password starting...");
      console.log("Username:", userName || "N/A");

      // API Request to reset password
      const response = await fetch(
        "http://10.0.2.2:3000/api/users/forgot-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username: userName }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        // Reset password request successful
        console.log(data);
        Alert.alert(
          "Email Sent",
          "Check the email associated with your Culinary Canvas account for the password reset link.",
          data.message
        );
      } else {
        // Reset password request failed
        console.log(data);
        Alert.alert("Password reset failed", data.message);
      }
    } catch (error) {
      //console.error("Error trying to reset password: ", error);
      //Alert.alert("Error", "An unexpected error occurred. Please try again.");
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
      <View style={{ paddingTop: 0, paddingBottom: hp(5) }}>
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
          Sign Into Culinary Canvas
        </Text>
        <Text
          style={{
            fontSize: hp(2),
            fontWeight: "bold",
            color: "grey",
            marginBottom: 35,
          }}
        >
          Get access to your favorite recipes and more!
        </Text>

        <View
          style={{
            backgroundColor: "#FFF",
            padding: hp(0.8),
            borderRadius: 15,
            marginBottom: hp(2.3),
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
                style={{ marginRight: hp(1) }}
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
            marginBottom: hp(1.5),
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
                style={{ marginRight: hp(1) }}
              />
            }
            inputType={"password"}
            value={password}
            onTextChange={setPassword}
            fieldButton={"Forgot?"}
            fieldButtonAction={handleForgotPassword}
          />
        </View>

        <CustomButton title={"Sign In"} onPress={handleLogin} />

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
            style={{ borderBottomWidth: 1, borderBottomColor: "#6B240C" }}
          >
            <Text style={{ color: "#6B240C", fontWeight: "bold" }}>
              Register
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
