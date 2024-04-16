import React, { useState, useEffect } from "react";
import { View, Text, Pressable, Image } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import MasonryList from "@react-native-seoul/masonry-list";
import Animated, { FadeInDown } from "react-native-reanimated";
import InnerLoading from "./InnerLoading";
import { useNavigation } from "@react-navigation/native";

const UserRecipeDisplay = ({ favoriteMealIds, navigation }) => {
  const [favoriteMeals, setFavoriteMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (favoriteMealIds.length > 0) {
      fetchFavoriteMeals();
    }
  }, [favoriteMealIds]);

  const fetchFavoriteMeals = async () => {
    try {
      console.log("Fetching favorite meals...");
      const favoriteMealsData = [];

      console.log("Number of favorite meal ids:", favoriteMealIds.length);

      for (const mealId of favoriteMealIds) {
        console.log("Processing meal ID:", mealId);
        try {
          const response = await fetch(
            `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
          );
          const data = await response.json();
          //console.log(`Fetched meal data for mealId ${mealId}:`, data);

          if (response.ok) {
            favoriteMealsData.push(data.meals[0]);
          } else {
            console.error(
              `Failed to fetch meal data for mealId ${mealId}. Status:`,
              response.status
            );
            favoriteMealsData.push(null);
          }
        } catch (error) {
          console.error(
            `Error fetching meal data for mealId ${mealId}:`,
            error
          );
        }
      }

      //console.log("Favorite meals data:", favoriteMealsData);
      setFavoriteMeals(favoriteMealsData.filter((meal) => meal !== null));
      setIsLoading(false);
      console.log("Fetch completed successfully.");
    } catch (error) {
      console.error("Error fetching favorite meals:", error);
      setIsLoading(false);
    }
  };

  return (
    <View style={[{ flex: 1, paddingHorizontal: wp(4) }]}>
      <Text
        style={{ fontSize: hp(3), paddingBottom: hp(1.5) }}
        className="font-semibold text-black"
      >
        Favorite Recipes
      </Text>
      <View style={{ flex: 1 }}>
        {isLoading ? (
          <InnerLoading size="large" className="mt-20" />
        ) : (
          <MasonryList
            data={favoriteMeals}
            keyExtractor={(item) => item.idMeal}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, i }) => (
              <RecipeCard item={item} index={i} navigation={navigation} />
            )}
            onEndReachedThreshold={0.1}
          />
        )}
      </View>
    </View>
  );
};

const RecipeCard = ({ item, index, navigation }) => {
  let isEven = index % 2 == 0;
  return (
    <Animated.View
      entering={FadeInDown.delay(index * 100)
        .duration(700)
        .springify()
        .damping(20)}
    >
      <Pressable
        style={{
          width: wp(45),
          paddingLeft: isEven ? 0 : 8,
          paddingRight: isEven ? 8 : 0,
        }}
        className="flex justify-center mb-4 space-y-1"
        onPress={() => navigation.navigate("RecipeInfoScreen", { ...item })}
      >
        <Image
          source={{ uri: item.strMealThumb }}
          style={{
            width: "100%",
            height: index % 3 == 0 ? hp(25) : hp(35),
            borderRadius: 35,
            borderWidth: 2,
            borderColor: "black",
          }}
          className="bg-black/5"
        />
        <Text
          style={{ fontSize: hp(1.5) }}
          className="font-normal ml-2 text-black"
        >
          {item.strMeal.length > 20
            ? item.strMeal.substring(0, 20) + "..."
            : item.strMeal}
        </Text>
      </Pressable>
    </Animated.View>
  );
};

export default UserRecipeDisplay;
