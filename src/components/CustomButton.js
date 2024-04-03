import React from "react";
import { Text, TouchableOpacity } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function CustomButton({ title, onPress }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: "#F5CCA0",
        padding: hp(1),
        borderRadius: 10,
        marginTop: hp(2),
        marginBottom: hp(7),
        width: wp(90),
      }}
    >
      <Text
        style={{
          textAlign: "center",
          fontWeight: 700,
          fontSize: 16,
          color: "black",
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}
