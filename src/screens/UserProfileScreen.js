import React from "react";
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  Button,
  SafeAreaView,
} from "react-native";
import { AuthContext } from "../context/AuthContext";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

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
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F5CCA0" }}>
      <Image
        source={require("../images/background.png")}
        style={{ position: "absolute", width: wp(100), height: hp(100) }}
      />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: hp(2),
          paddingTop: hp(5),
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ backgroundColor: "white", borderRadius: 20 }}
        >
          <MaterialIcons name="chevron-left" size={hp(4)} color="black" />
        </TouchableOpacity>
      </View>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginBottom: hp(1.5),
        }}
      >
        <Image
          source={require("../images/profilePic.png")}
          style={{ height: hp(22), width: hp(22), borderRadius: hp(5) }}
        />
        <TouchableOpacity
          style={{
            backgroundColor: "#FF9F45",
            padding: 10,
            borderRadius: 5,
            alignItems: "center",
          }}
          onPress={handleLogout}
        >
          <Text>Sign Out</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: "#FF9F45",
            padding: 10,
            borderRadius: 5,
            alignItems: "center",
            marginTop: hp(2),
          }}
          onPress={() => navigation.navigate("ResetPasswordScreen")}
        >
          <Text>Reset Password</Text>
        </TouchableOpacity>
      </View>

      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Text>View Your Favorite Recipes:</Text>
        <View
          style={{
            height: 2,
            backgroundColor: "black",
            width: "100%",
            marginTop: hp(0.5),
            marginBottom: hp(1.5),
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default UserProfileScreen;
