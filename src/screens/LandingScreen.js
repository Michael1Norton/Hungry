import React from "react";
import { SafeAreaView, Text, StyleSheet } from "react-native";

const LandingScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Landing Screen :D</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default LandingScreen;
