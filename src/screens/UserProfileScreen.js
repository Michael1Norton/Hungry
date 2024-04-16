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
import { useEffect, useState, useContext } from "react";
import UserRecipeDisplay from "../components/UserRecipeDisplay";
import { ActivityIndicator } from "react-native";
import GetUsername from "../components/GetUsername";

const UserProfileScreen = () => {
  const { logout } = React.useContext(AuthContext);
  const navigation = useNavigation();
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  //const [username, setUsername] = useState("");

  const { userData } = useContext(AuthContext);
  const username = GetUsername();

  useEffect(() => {
    if (userData) {
      fetchFavoriteRecipes();
    } else {
      console.log("User Data not found");
    }
  }, [userData]);

  const fetchFavoriteRecipes = async () => {
    try {
      const response = await fetch(
        `http://culinary-canvas-express.com:80/favorite-recipe/${userData.username}`
      );
      if (response.ok) {
        const data = await response.json();
        const recipeIds = data.map((recipe) => recipe.recipeId);
        setFavoriteRecipes(recipeIds);
        console.log("Favorite recipeIds:", recipeIds); // Log favorite recipeIds here
      } else {
        console.error("Failed to fetch favorite recipes");
      }
    } catch (error) {
      console.error("Error fetching favorite recipes:", error);
    }
  };

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

      <View style={{ flex: 1, flexDirection: "row" }}>
        <UserRecipeDisplay
          favoriteMealIds={favoriteRecipes}
          navigation={navigation}
        />
      </View>
    </SafeAreaView>
  );
};

export default UserProfileScreen;
