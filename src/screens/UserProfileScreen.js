import React from "react";
import { SafeAreaView, Text, StyleSheet, Button } from "react-native";
import { AuthContext } from "../context/AuthContext";
import { useNavigation } from "@react-navigation/native"; // Import useNavigation hook

const UserProfileScreen = () => {
  const { logout } = React.useContext(AuthContext);
  const navigation = useNavigation(); // Initialize useNavigation hook

  const handleLogout = () => {
    logout();
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text>Landing Screen :D</Text>
      <Button title="Logout" onPress={handleLogout} />
      <Button title="Go Back" onPress={handleGoBack} />
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

export default UserProfileScreen;
