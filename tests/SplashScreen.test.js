import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import SplashScreen from "../app/screens/SplashScreen"; // Adjust the import path as needed
import { RFPercentage } from "react-native-responsive-fontsize";

jest.useFakeTimers(); // Mock timers for useEffect

describe("SplashScreen", () => {
  test("renders correctly", () => {
    const { getByRole } = render(
      <SplashScreen navigation={{ navigate: jest.fn() }} />
    );
    expect(getByRole("img")).toHaveProp("source", { uri: "your-logo-uri" }); // Adjust the URI check based on your actual source
  });

  test("navigates to BottomTab after 3 seconds", () => {
    const mockNavigate = jest.fn();
    render(<SplashScreen navigation={{ navigate: mockNavigate }} />);

    // Fast-forward all timers
    jest.runAllTimers();

    expect(mockNavigate).toHaveBeenCalledWith("BottomTab");
  });

  test("navigates to BottomTab on logo press", () => {
    const mockNavigate = jest.fn();
    const { getByRole } = render(
      <SplashScreen navigation={{ navigate: mockNavigate }} />
    );

    // Simulate logo press
    fireEvent.press(getByRole("img"));

    expect(mockNavigate).toHaveBeenCalledWith("BottomTab");
  });
});
