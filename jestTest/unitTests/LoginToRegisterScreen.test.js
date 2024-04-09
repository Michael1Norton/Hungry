import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { AuthContext } from "../../src/context/AuthContext";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "../../src/screens/LoginScreen";

// Mock AsyncStorage
jest.mock("@react-native-async-storage/async-storage", () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
}));

// Mock the navigation prop
const mockNavigation = {
  navigate: jest.fn(),
};

describe("LoginScreen", () => {
  it("navigates to RegisterScreen when 'Register' link is clicked", () => {
    const authContextValue = {
      login: jest.fn(), // Mock the login function
    };

    const { getByText } = render(
      <NavigationContainer>
        <AuthContext.Provider value={authContextValue}>
          <LoginScreen navigation={mockNavigation} />
        </AuthContext.Provider>
      </NavigationContainer>
    );
    const registerLink = getByText("Register");

    fireEvent.press(registerLink);

    expect(mockNavigation.navigate).toHaveBeenCalledWith("RegisterScreen");
  });
});
