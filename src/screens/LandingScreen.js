import React from "react";
import { SafeAreaView, Text, StyleSheet, Button } from "react-native";
import { AuthContext } from "../context/AuthContext";

const LandingScreen = () => {
  const { logout } = React.useContext(AuthContext);

  const handleLogout = () => {
    logout();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text>Landing Screen :D</Text>
      <Button title="Logout" onPress={handleLogout} />
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
