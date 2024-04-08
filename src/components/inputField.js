import React from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function InputField({
  label,
  icon,
  inputType,
  keyboardType,
  fieldButton,
  fieldButtonAction,
  onTextChange,
}) {
  return (
    <View
      style={{
        flexDirection: "row",
        borderBottomColor: "#ccc",
        borderBottomWidth: 2,
        paddingBottom: hp(0.2),
        marginBottom: hp(0.2),
      }}
    >
      {icon}

      <TextInput
        placeholder={label}
        keyboardType={keyboardType}
        style={{ flex: 1, paddingVertical: 0 }}
        secureTextEntry={inputType === "password"}
        onChangeText={onTextChange}
      />

      {fieldButton && (
        <TouchableOpacity onPress={fieldButtonAction}>
          <Text style={{ color: "#6B240C", fontWeight: "bold" }}>
            {fieldButton}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
