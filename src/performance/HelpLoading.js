import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect } from "react";
import Animated from "react-native-reanimated";

export const CachedImage = (props) => {
  const [cachedSource, setCachedSource] = useState(null);
  const { uri } = props;

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const cachedImageData = await AsyncStorage.getItem(uri);
        if (cachedImageData) {
          setCachedSource({ uri: cachedImageData });
        } else {
          const response = await fetch(uri);
          const blob = await response.blob();
          const base64data = await new Promise((resolve) => {
            const reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onload = () => {
              resolve(reader.result);
            };
          });
          await AsyncStorage.setItem(uri, base64data);
          setCachedSource({ uri: base64data });
        }
      } catch (error) {
        console.error("Error fetching image: ", error);
      }
    };
    fetchImage();
  }, []);

  return <Animated.Image source={cachedSource} {...props} />;
};
