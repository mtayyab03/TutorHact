import React from "react";
import { render } from "@testing-library/react-native";
import TutorSignUp from "../app/screens/TutorSignUp";

describe("TutorSignUp", () => {
  it("renders correctly", () => {
    const tree = render(<TutorSignUp />);
    expect(tree).toBeTruthy();
  });
});
