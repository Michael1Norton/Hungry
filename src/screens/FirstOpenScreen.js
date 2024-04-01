import React, { useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableOpacity,
  Animated,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import LoginBackground from "../images/1.png";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const FirstOpenScreen = () => {
  const navigation = useNavigation();

  const logoScale = new Animated.Value(0); // Initial scale for logo

  useEffect(() => {
    startAnimations(); // Start animations when the screen mounts
  }, []); // Empty dependency array ensures this effect runs only once after initial render

  const startAnimations = () => {
    Animated.parallel([
      // Logo animation
      Animated.timing(logoScale, {
        toValue: 1, // Final scale
        duration: 2500, // Duration of the animation
        useNativeDriver: true, // Enable native driver for performance
      }),
    ]).start(); // Start both animations
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "crimson",
        paddingBottom: hp(5),
      }}
    >
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Animated.View
          style={{
            transform: [{ scale: logoScale }], // Apply scale animation
            backgroundColor: "ivory",
            borderRadius: 9999,
            padding: 5,
            marginBottom: hp(20),
          }}
        >
          <Image
            source={LoginBackground}
            style={{ width: hp(40), height: hp(40), borderRadius: 90 }}
          />
        </Animated.View>
      </View>
      <TouchableOpacity
        style={{
          backgroundColor: "ivory",
          padding: 20,
          width: "90%",
          borderRadius: 10,
          marginBottom: -85,
          flexDirection: "row",
          justifyContent: "center",
        }}
        onPress={() => navigation.navigate("LoginScreen")}
      >
        <Text
          style={{
            color: "crimson",
            fontSize: hp(2.5),
            textAlign: "center",
            justifyContent: "center",
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
