import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import CustomButton from "../components/CustomButton";
import InputField from "../components/inputField";
import LoginBackground from "../images/LoginBackground.jpg";
import GoogleImage from "../images/google.svg.png";
import InstagramImage from "../images/Instagram_logo_2016.svg.webp";
import XImage from "../images/X-logo.jpg";

const RegisterScreen = ({ navigation }) => {
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
        />

        <CustomButton title={"Register"} onPress={() => {}} />

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
