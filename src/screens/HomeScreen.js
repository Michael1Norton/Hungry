import React from "react";
import { View, Text, ScrollView, Image, TextInput } from "react-native";
import { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Categories from "../components/Categories";
import Recipes from "../components/Recipes";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const HomeScreen = () => {
  const [activeCategory, setActiveCategory] = useState("Beef");
  const [categories, setCategories] = useState([]);
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    getCategory();
    getRecipes();
  }, []);

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

  return (
    <View className="flex-1 bg-white">
      <StatusBar style="dark" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50, paddingTop: hp(3) }}
        className="space-y-6 pt-15"
      >
        {/* Inserting the user icon */}
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

        {/* Welcome Back */}
        <View className="mx-4 space-y-2 mb-2">
          <Text style={{ fontSize: hp(2) }} className="text-neutral-600">
            Welcome back!
          </Text>

          {/* Make ur own food and the home color */}
          <View>
            <Text
              style={{ fontSize: hp(4) }}
              className="font-semibold text-neutral-600"
            >
              Make your own food,
            </Text>
          </View>
          <Text
            style={{ fontSize: hp(4) }}
            className="font-semibold text-neutral-600"
          >
            stay at <Text className="text-amber-400">home</Text>
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
            placeholderTextColor={"gray"}
            style={{ fontSize: hp(2), flex: 1 }}
            className="text-base mb-1 pl-3 tracking-wider"
          />
        </View>

        {/* Categories */}
        <View>
          {categories.length > 0 && (
            <Categories
              categories={categories}
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
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
