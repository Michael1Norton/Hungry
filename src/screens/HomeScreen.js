import React from "react";
import { View, Text, ScrollView, Image, TextInput } from "react-native";
import { StatusBar } from "expo-status-bar";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Categories from "../components/Categories";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const HomeScreen = () => {
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
          <Categories />
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
