import React from "react";
import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import { categoryData } from "../testData";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function Categories() {
  return (
    <View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="space-x-4"
        contentContainerStyle={{ paddingHorizontal: 20 }}
      >
        {categoryData.map((category, index) => {
          return (
            <TouchableOpacity
              key={index}
              className="flex item-center space-y-1"
            >
              <View className="rounded=full p-[6px]">
                <Image
                  source={{ uri: category.strCategoryThumb }}
                  style={{ height: hp(5), width: hp(5) }}
                  className="rounded-full"
                />
              </View>
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
    </View>
  );
}
