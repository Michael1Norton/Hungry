import React from "react";
import { useEffect } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
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
      100
    );
    setTimeout(
      () => (ring3Padding.value = withSpring(ring3Padding.value + hp(5))),
      200
    );
    setTimeout(
      () => (ring4Padding.value = withSpring(ring4Padding.value + hp(6))),
      300
    );
  }, []);

  return (
    <View className="flex-1 justify-center items-center space-y-10 bg-amber-500">
      <Image
        source={require("../images/background.png")}
        style={{ position: "absolute", width: wp(100), height: hp(100) }}
      />
      <StatusBar style="light" />
      {/*Inserting logo with 4 rings which will be minimalistic and animated*/}
      <Animated.View
        className="bg-white/20 rounded-full"
        style={{ padding: ring4Padding }}
      >
        <Animated.View
          className="bg-white/40 rounded-full"
          style={{ padding: ring3Padding }}
        >
          <Animated.View
            className="bg-white/60 rounded-full"
            style={{ padding: ring2Padding }}
          >
            <Animated.View
              className="bg-white/80 rounded-full"
              style={{ padding: hp(0) }}
            >
              <Image
                source={require("../images/1.png")}
                style={{ width: hp(40), height: hp(40) }}
              />
            </Animated.View>
          </Animated.View>
        </Animated.View>
      </Animated.View>

      <TouchableOpacity onPress={() => navigation.navigate("LoginScreen")}>
        <View className="bg-amber-800 rounded-full p-4 flex items-center justify-center">
          <Text className="font-bold text-white text-lg">Lets Eat! </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default FirstOpenScreen;
