import React from "react";
import { ScrollView } from "react-native";
import { SafeAreaView, Text, StyleSheet, Button } from "react-native";
import { AuthContext } from "../context/AuthContext";

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50 }}
      >
        <Text>Landing Screen :D Awesome</Text>
      </ScrollView>
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

export default HomeScreen;
