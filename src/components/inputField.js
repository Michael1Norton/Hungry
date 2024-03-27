import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  onChangeText,
} from "react-native";

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
        paddingBottom: 8,
        marginBottom: 20,
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

      <TouchableOpacity onPress={fieldButtonAction}>
        <Text style={{ color: "orange", fontWeight: "bold" }}>
          {fieldButton}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
