import React from "react";
import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Animated, { FadeInUp } from "react-native-reanimated";

export default function Categories({
  categories,
  activeCategory,
  setActiveCategory,
}) {
  return (
    <Animated.View entering={FadeInUp.duration(500).springify()}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="space-x-4"
        contentContainerStyle={{ paddingHorizontal: 20 }}
      >
        {categories.map((category, index) => {
          let isActive = category.strCategory === activeCategory;
          let activeButtonClass = isActive ? "bg-amber-400" : "bg-black/10";
          return (
            <TouchableOpacity
              key={index}
              onPress={() => setActiveCategory(category.strCategory)}
              className="flex item-center space-y-1"
            >
              <View className={"rounded-full p-[6px] " + activeButtonClass}>
                <Image
                  source={{ uri: category.strCategoryThumb }}
                  style={{ height: hp(6), width: hp(6) }}
                  className="rounded-full"
                />
              </View>
              {/* Category Name Text */}
              <Text
                style={{ fontSize: hp(1.5), textAlign: "center" }}
                className="text-neutral-600 font-semibold"
              >
                {category.strCategory}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </Animated.View>
  );
}
