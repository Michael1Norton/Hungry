import React from "react";
import {
  View,
  ScrollView,
  StatusBar,
  Image,
  TouchableOpacity,
  Text,
} from "react-native";
import { useState, useEffect, useContext } from "react";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";
import InnerLoading from "../components/InnerLoading";
import YouTubeIFrame from "react-native-youtube-iframe";
import { AuthContext } from "../context/AuthContext";
import { Alert } from "react-native";
import GetUsername from "../components/GetUsername";

const RecipeInfoScreen = (props) => {
  //console.log(props.route.params);
  let itemInfo = props.route.params;
  const [isFav, setIsFav] = useState(false);
  const [meal, setMeal] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [playing, setPlaying] = useState(false);
  //const [username, setUsername] = useState("");
  const [mealId, setMealId] = useState(null);
  const navigation = useNavigation();

  const { userData } = useContext(AuthContext);

  const username = GetUsername();

  useEffect(() => {
    const mealId = itemInfo.idMeal;
    setMealId(mealId);
    console.log("Meal:", mealId);
    getRecipeData(itemInfo.idMeal);
    console.log("User Data check:", userData);
    checkIsFavorite(username, mealId);
  }, [itemInfo.idMeal]);

  {
    /* Get recipes info from the mealdb api */
  }
  const getRecipeData = async (id) => {
    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
      );
      const data = await response.json();
      //console.log(data);
      if (response.ok) {
        setMeal(data.meals[0]);
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error getting categories: ", error);
    }
  };

  const checkIsFavorite = async (username, mealId) => {
    console.log(
      "Checking if favorite for username:",
      username,
      "and mealId:",
      mealId
    );
    try {
      const response = await fetch(
        "http://culinary-canvas-express.com:40/is-favorite",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, recipeId: mealId }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        setIsFav(data.isFavorite);
        console.log("Is favorite:", data.isFavorite); // Log the value of isFavorit
      }
    } catch (error) {
      console.error("Error checking if recipe is favorite: ", error);
    }
  };

  const handleFav = async (username, mealId) => {
    try {
      console.log("Username in function:", username);
      console.log("Meal ID in function:", mealId);
      const response = await fetch(
        "http://culinary-canvas-express.com:40/favorite-recipe/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, recipeId: mealId }),
        }
      );
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        setIsFav(true);
        //Alert.alert("Success", "Meal added to favorites!");
      } else {
        Alert.alert("Error", "Failed to add meal to favorites.");
      }
    } catch (error) {
      console.error("Error adding meal to favorites: ", error);
      Alert.alert("Error", "An unexpected error occurred. Please try again.");
    }
  };

  const handleUnfav = async (username, mealId) => {
    try {
      const response = await fetch(
        "http://culinary-canvas-express.com:40/unfavorite",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, recipeId: mealId }),
        }
      );
      if (response.ok) {
        setIsFav(false);
        //Alert.alert("Success", "Meal removed from favorites!");
      } else {
        Alert.alert("Error", "Failed to remove meal from favorites.");
      }
    } catch (error) {
      console.error("Error removing meal from favorites: ", error);
      Alert.alert("Error", "An unexpected error occurred. Please try again.");
    }
  };

  const ingredientsIndexes = (meal) => {
    if (!meal) return [];
    let indexes = [];
    for (let i = 1; i <= 20; i++) {
      if (meal[`strIngredient${i}`]) {
        indexes.push(i);
      }
    }
    return indexes;
  };

  const getYoutubeVideoId = (url) => {
    const regex = /[?&]v=([^&]+)/;
    const match = url.match(regex);
    //console.log("recieved: ", match[1]);
    return match ? match[1] : null;
  };

  return (
    <ScrollView
      className="bg-primary flex-1"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 30 }}
    >
      <StatusBar style={"light"} />
      {/* Recipe Image */}
      <View className="flex-row justify-center">
        <Image
          source={{ uri: itemInfo.strMealThumb }}
          style={{
            width: wp(98),
            height: hp(50),
            borderRadius: 35,
            marginTop: hp(5),
          }}
          className="bg-black/5"
        />
      </View>

      {/* Back button to return to home screen */}
      <View className="w-full absolute flex-row justify-between items-center pt-14">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="p-0 rounded-full ml-5 bg-white"
        >
          <MaterialIcons
            name="chevron-left"
            size={hp(4)}
            color="black"
            style={{ marginRight: 10, marginLeft: 10 }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            isFav ? handleUnfav(username, mealId) : handleFav(username, mealId)
          }
          className="p-0 rounded-full mr-5 bg-white"
        >
          <MaterialIcons
            name="favorite"
            size={hp(4)}
            color={isFav ? "red" : "grey"}
            style={{ marginRight: 10, marginLeft: 10 }}
          />
        </TouchableOpacity>
      </View>

      {/* Recipe Info */}
      {isLoading ? (
        <InnerLoading size="large" className="mt-20" />
      ) : (
        <View className="px-4 flex justify-between space-y-2 pt-8">
          <View className="space-y-2">
            <Text
              style={{ fontSize: hp(3) }}
              className="font-bold flex-1 text-black"
            >
              {meal?.strMeal}
            </Text>
            <Text
              style={{ fontSize: hp(2) }}
              className="font-medium flex-1 text-third"
            >
              <Text className="text-black">Region: </Text>
              {meal?.strArea}
            </Text>
          </View>

          <View className="flex-row justify-around"></View>
          {/* Ingredients */}
          <View className="space-y-4">
            <Text
              style={{ fontSize: hp(2) }}
              className="font-bold flex-1 text-black"
            >
              Ingredients
            </Text>
            <View
              style={{ height: 2, backgroundColor: "black", width: "100%" }}
            />
            <View className="space-y-2 ml-3">
              {ingredientsIndexes(meal).map((i) => {
                return (
                  <View key={i} className="flex-row space-x-4">
                    <View
                      style={{ height: hp(1.5), width: hp(1.5) }}
                      className="bg-secondary-100 rounded-full"
                    />
                    <View className="flex-row space-x-2">
                      <Text
                        style={{ fontSize: hp(1.8) }}
                        className="font-bold text-third"
                      >
                        {meal["strMeasure" + i]}
                      </Text>
                      <Text
                        style={{ fontSize: hp(1.8) }}
                        className="font-medium text-black"
                      >
                        {meal["strIngredient" + i]}
                      </Text>
                    </View>
                  </View>
                );
              })}
            </View>
          </View>
          {/* Instructions */}
          <View className="space-y-2">
            <Text
              style={{ fontSize: hp(2) }}
              className="font-bold flex-1 text-black"
            >
              Instructions
            </Text>
            <View
              style={{ height: 2, backgroundColor: "black", width: "100%" }}
            />
            <Text style={{ fontSize: hp(1.8) }} className="text-black">
              {meal?.strInstructions}
            </Text>
          </View>

          {/* Video */}
          {meal?.strYoutube && (
            <View className="space-y-4">
              <Text
                style={{ fontSize: hp(2) }}
                className="font-bold flex-1 text-black"
              >
                Recipe Video
              </Text>
              <View
                style={{ height: 2, backgroundColor: "black", width: "100%" }}
              />
              <View className="flex-row justify-center">
                <YouTubeIFrame
                  height={hp(30)}
                  width={wp(100)}
                  play={playing}
                  videoId={getYoutubeVideoId(meal?.strYoutube)}
                  //onChangeState={onStateChange}
                />
              </View>
            </View>
          )}
        </View>
      )}
    </ScrollView>
  );
};

export default RecipeInfoScreen;
