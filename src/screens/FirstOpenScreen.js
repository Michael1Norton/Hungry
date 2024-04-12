import React from "react";
import { useEffect } from "react";
import { View, Text, Image, TouchableOpacity, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import Animated, { useSharedValue, withSpring } from "react-native-reanimated";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const FirstOpenScreen = () => {
  const navigation = useNavigation();

  const ring2Padding = useSharedValue(0);
  const ring3Padding = useSharedValue(0);
  const ring4Padding = useSharedValue(0);

  useEffect(() => {
    ring2Padding.value = 0;
    ring3Padding.value = 0;
    ring4Padding.value = 0;

    setTimeout(
      () => (ring2Padding.value = withSpring(ring2Padding.value + hp(5))),
      200
    );
    setTimeout(
      () => (ring3Padding.value = withSpring(ring3Padding.value + hp(5))),
      300
    );
    setTimeout(
      () => (ring4Padding.value = withSpring(ring4Padding.value + hp(6))),
      400
    );
  }, []);

  return (
    <View
      style={{ backgroundColor: "#994D1C" }}
      className="flex-1 justify-center items-center space-y-10"
    >
      <Image
        source={require("../images/background.png")}
        style={{ position: "absolute", width: wp(100), height: hp(100) }}
      />

      <StatusBar style="light" />
      {/*Inserting logo with 4 rings which will be minimalistic and animated*/}
      <Animated.View
        className="bg-sixth/20 rounded-full"
        style={{ padding: ring4Padding }}
      >
        <Animated.View
          className="bg-fifth/40 rounded-full"
          style={{ padding: ring3Padding }}
        >
          <Animated.View
            className="bg-secondary-100/60 rounded-full"
            style={{ padding: ring2Padding }}
          >
            <Animated.View
              className="bg-primary/80 rounded-full"
              style={{ padding: hp(0) }}
            >
              <Image
                source={require("../images/logo2.png")}
                style={{ width: hp(40), height: hp(40) }}
              />
            </Animated.View>
          </Animated.View>
        </Animated.View>
      </Animated.View>

      <TouchableOpacity
        onPress={() => {
          //console.log("Button pressed");
          navigation.navigate("LoginScreen");
        }}
      >
        <View
          style={{ backgroundColor: "#F5CCA0" }}
          className="rounded-full p-4 items-center justify-center"
        >
          <Text className="font-bold text-third text-lg">Lets Eat! </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default FirstOpenScreen;
