import React from "react";
import { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = async ({ token, username }) => {
    setIsLoading(true);
    const userData = { token, username };
    setUserData(userData);
    await AsyncStorage.setItem("userData", JSON.stringify(userData));
    setIsLoading(false);
  };

  const logout = async () => {
    setIsLoading(true);
    setUserData(null);
    await AsyncStorage.removeItem("userData");
    setIsLoading(false);
  };

  const isLoggedIn = async () => {
    try {
      setIsLoading(true);
      let storedUserData = await AsyncStorage.getItem("userData");
      if (storedUserData) {
        setUserData(JSON.parse(storedUserData));
      }
      setIsLoading(false);
    } catch (error) {
      console.error(
        "Error trying to get user data from AsyncStorage for isLoggedIn: ",
        error
      );
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider value={{ userData, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
