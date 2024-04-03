import React from "react";
import {
  View,
  ScrollView,
  StatusBar,
  Image,
  TouchableOpacity,
  Text,
} from "react-native";
import { useState, useEffect } from "react";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";
import InnerLoading from "../components/InnerLoading";
import YouTubeIFrame from "react-native-youtube-iframe";

const RecipeInfoScreen = (props) => {
  //console.log(props.route.params);
  let itemInfo = props.route.params;
  const [isFav, setIsFav] = useState(false);
  const [meal, setMeal] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [playing, setPlaying] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    getRecipeData(itemInfo.idMeal);
  }, []);

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
      className="bg-white flex-1"
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
            marginTop: hp(3),
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
            color="orange"
            style={{ marginRight: 10, marginLeft: 10 }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setIsFav(!isFav)}
          className="p-0 rounded-full mr-5 bg-white"
        >
          <MaterialIcons
            name="favorite"
            size={hp(4)}
            color={isFav ? "red" : "gray"}
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
              className="font-bold flex-1 text-neutral-700"
            >
              {meal?.strMeal}
            </Text>
            <Text
              style={{ fontSize: hp(2) }}
              className="font-medium flex-1 text-amber-500"
            >
              <Text className="text-neutral-500">Region: </Text>
              {meal?.strArea}
            </Text>
          </View>

          <View className="flex-row justify-around"></View>
          {/* Ingredients */}
          <View className="space-y-4">
            <Text
              style={{ fontSize: hp(2) }}
              className="font-bold flex-1 text-neutral-700"
            >
              Ingredients
            </Text>
            <View className="space-y-2 ml-3">
              {ingredientsIndexes(meal).map((i) => {
                return (
                  <View key={i} className="flex-row space-x-4">
                    <View
                      style={{ height: hp(1.5), width: hp(1.5) }}
                      className="bg-amber-300 rounded-full"
                    />
                    <View className="flex-row space-x-2">
                      <Text
                        style={{ fontSize: hp(1.8) }}
                        className="font-bold text-neutral-700"
                      >
                        {meal["strMeasure" + i]}
                      </Text>
                      <Text
                        style={{ fontSize: hp(1.8) }}
                        className="font-medium text-neutral-600"
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
              className="font-bold flex-1 text-neutral-700"
            >
              Instructions
            </Text>
            <Text style={{ fontSize: hp(1.8) }} className="text-neutral-700">
              {meal?.strInstructions}
            </Text>
          </View>

          {/* Video */}
          {meal?.strYoutube && (
            <View className="space-y-4">
              <Text
                style={{ fontSize: hp(2) }}
                className="font-bold flex-1 text-neutral-700"
              >
                Recipe Video
              </Text>
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
