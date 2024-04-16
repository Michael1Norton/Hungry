import React from "react";
import { View, Text, Pressable, Image } from "react-native";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import MasonryList from "@react-native-seoul/masonry-list";
import Animated, { FadeInDown } from "react-native-reanimated";
import InnerLoading from "./InnerLoading";
import { useNavigation } from "@react-navigation/native";

export default function Recipes({ categories, recipes }) {
  const navigation = useNavigation();
  return (
    <View className="mx-4 space-y-3">
      <Text style={{ fontSize: hp(3) }} className="font-semibold text-black">
        Recipes
      </Text>
      <View>
        {categories.length == 0 || recipes.length == 0 ? (
          <InnerLoading size="large" className="mt-20" />
        ) : (
          <MasonryList
            data={recipes}
            keyExtractor={(item) => item.idMeal}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, i }) => (
              <RecipeCard item={item} index={i} navigation={navigation} />
            )}
            //refreshing={isLoadingNext}
            //onRefresh={() => refetch({ first: ITEM_CNT })}
            onEndReachedThreshold={0.1}
            //onEndReached={() => loadNext(ITEM_CNT)}
          />
        )}
      </View>
    </View>
  );
}

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
          width: "100",
          paddingLeft: isEven ? 0 : 8,
          paddingRight: isEven ? 8 : 0,
        }}
        className="flex justify-center mb-4 space-y-1"
        // () => console.log("Pressed")
        onPress={() => navigation.navigate("RecipeInfoScreen", { ...item })}
      >
        {
          <Image
            source={{
              uri: item.strMealThumb,
            }}
            style={{
              width: "100%",
              height: index % 3 == 0 ? hp(25) : hp(35),
              borderRadius: 35,
              borderWidth: 2,
              borderColor: "black",
            }}
            className="bg-black/5"
          ></Image>
        }
        {/* <CachedImage
          uri={item.strMealThumb}
          style={{
            width: "100%",
            height: index % 3 == 0 ? hp(25) : hp(35),
            borderRadius: 35,
          }}
          className="bg-black/5"
        />  */}
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
