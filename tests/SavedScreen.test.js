import React from "react";
import { render } from "@testing-library/react-native";
import SavedScreen from "../app/screens/SavedScreen";

describe("SavedScreen", () => {
  it("renders correctly", () => {
    const tree = render(<SavedScreen />);
    expect(tree).toBeTruthy();
  });
});
