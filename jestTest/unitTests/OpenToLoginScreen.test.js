import React from "react";
import { TouchableOpacity } from "react-native";
import { render, fireEvent } from "@testing-library/react-native";
import FirstOpenScreen from "../../src/screens/FirstOpenScreen";

// Mock the useNavigation hook within the component
jest.mock("@react-navigation/native", () => ({
  useNavigation: jest.fn(),
}));

describe("FirstOpenScreen", () => {
  it("navigates to LoginScreen when 'Lets Eat!' button is pressed", () => {
    // Mock navigate function
    const navigateMock = jest.fn();
    // Mock useNavigation hook to return navigateMock
    jest
      .spyOn(require("@react-navigation/native"), "useNavigation")
      .mockReturnValue({ navigate: navigateMock });

    const { getByText } = render(<FirstOpenScreen />);
    const letsEatButton = getByText("Lets Eat!");

    fireEvent.press(letsEatButton);

    expect(navigateMock).toHaveBeenCalledWith("LoginScreen");
  });
});
