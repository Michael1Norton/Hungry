import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";
import RegisterScreen from "../../src/screens/RegisterScreen";

// Mock the navigation prop
const mockNavigation = {
  goBack: jest.fn(),
};

describe("RegisterScreen", () => {
  it("navigates back to LoginScreen when 'Login' link is clicked", () => {
    const { getByText } = render(
      <NavigationContainer>
        <RegisterScreen navigation={mockNavigation} />
      </NavigationContainer>
    );
    const loginLink = getByText("Login");

    fireEvent.press(loginLink);

    expect(mockNavigation.goBack).toHaveBeenCalledTimes(1);
  });
});
