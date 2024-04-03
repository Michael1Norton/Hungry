import React from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Categories from "../components/Categories";
import Recipes from "../components/Recipes";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";
import { UserProfileScreen } from "./UserProfileScreen";

const HomeScreen = () => {
  const [activeCategory, setActiveCategory] = useState("Beef");
  const [categories, setCategories] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    getCategory();
    getRecipes();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() !== "") {
      searchRecipesByName();
    }
  }, [searchQuery]);

  {
    /* Get categories from the mealdb api */
  }
  const getCategory = async () => {
    try {
      const response = await fetch(
        "https://www.themealdb.com/api/json/v1/1/categories.php"
      );
      const data = await response.json();
      //console.log(data);
      if (response.ok) {
        setCategories(data.categories);
      }
    } catch (error) {
      console.error("Error getting categories: ", error);
    }
  };

  {
    /* Get Recipes from the mealdb api */
  }
  const getRecipes = async (category = "Beef") => {
    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
      );
      const data = await response.json();
      //console.log(data);
      if (response.ok) {
        setRecipes(data.meals);
      }
    } catch (error) {
      console.error("Error getting categories: ", error);
    }
  };

  {
    /* Handles switching category so it updates masonrylist */
  }
  const changeCategory = (category) => {
    getRecipes(category);
    setActiveCategory(category);
    setRecipes([]);
  };

  const searchRecipesByName = async () => {
    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchQuery}`
      );
      const data = await response.json();
      if (response.ok) {
        setRecipes(data.meals);
      }
    } catch (error) {
      console.error("Error searching recipes: ", error);
    }
  };

  return (
    <View className="flex-1 bg-primary">
      <StatusBar style="dark" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50, paddingTop: hp(3) }}
        className="space-y-2 pt-15"
      >
        {/* Inserting the user icon */}
        <TouchableOpacity
          onPress={() => navigation.navigate("UserProfileScreen")}
        >
          <View className="mx-4 flex-row justify-between items-center mb-2">
            <Image
              source={require("../images/profilePic.png")}
              style={{ height: hp(6), width: hp(5), borderRadius: hp(5) }}
            />
            <MaterialIcons
              name="notifications"
              size={hp(4)}
              color="black"
              style={{ marginRight: 10 }}
            />
          </View>
        </TouchableOpacity>

        {/* Welcome Back */}
        <View className="mx-4 space-y-2 mb-2">
          <Text style={{ fontSize: hp(2) }} className="text-back">
            Feeling Hungry?
          </Text>

          {/* Make ur own food and the home color */}
          <View>
            <Text
              style={{ fontSize: hp(3.5) }}
              className="font-normal text-black"
            >
              Food you love,
            </Text>
          </View>
          <Text
            style={{ fontSize: hp(3.5) }}
            className="font-normal text-black"
          >
            from the comfort of{" "}
            <Text className="text-third font-bold">home</Text>
          </Text>
        </View>

        {/* Search Bar */}
        <View className="mx-4 flex-row items-center rounded-full bg-black/5 p-[6px]">
          {/* Search icon */}
          <MaterialIcons
            name="search"
            size={24}
            color="black"
            style={{ marginRight: 10 }}
          />
          {/* TextInput */}
          <TextInput
            placeholder="Search for recipes"
            placeholderTextColor={"black"}
            style={{ fontSize: hp(2), flex: 1 }}
            className="text-base mb-1 pl-3 tracking-wider"
            onChangeText={setSearchQuery}
            value={searchQuery}
          />
        </View>

        {/* Categories */}
        <View>
          {categories.length > 0 && (
            <Categories
              categories={categories}
              activeCategory={activeCategory}
              changeCategory={changeCategory}
            />
          )}
        </View>

        {/* Recipes */}
        <View>
          <Recipes recipes={recipes} categories={categories} />
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
