import React from "react";
import { render } from "@testing-library/react-native";
import HomeScreen from "../app/screens/HomeScreen";

describe("HomeScreen", () => {
  it("renders correctly", () => {
    const tree = render(<HomeScreen />);
    expect(tree).toBeTruthy();
  });
});
