import React from "react";
import { render } from "@testing-library/react-native";
import Header from "../app/components/Header"; // Update with the correct path

describe("Header Component", () => {
  it("should render correctly and contain expected elements", () => {
    // Mock function for onPress
    const mockOnPress = jest.fn();

    // Render the Header component
    const { getByText } = render(<Header onpress={mockOnPress} />);

    // Check if the SIGN UP AS TUTOR text is present
    expect(getByText("SIGN UP AS TUTOR")).toBeTruthy();
  });
});
