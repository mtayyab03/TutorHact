import React from "react";
import { render } from "@testing-library/react-native";
import AppButton from "../app/components/AppButton"; // Adjust the import path as needed
import Colors from "../app/config/Colors";

describe("AppButton", () => {
  test("renders with correct title", () => {
    const { getByText } = render(
      <AppButton title="Click Me" buttonColor={Colors.primary} />
    );
    expect(getByText("Click Me")).toBeTruthy();
  });

  test("renders with correct gradient colors", () => {
    const { getByText } = render(
      <AppButton title="Click Me" buttonColor={Colors.primary} />
    );

    const button = getByText("Click Me").parent;
    expect(button.props.colors).toEqual([Colors.primary, Colors.secondary]);
  });

  test("applies correct styles to the text", () => {
    const { getByText } = render(
      <AppButton title="Click Me" buttonColor={Colors.primary} />
    );

    const buttonText = getByText("Click Me");
    expect(buttonText.props.style).toEqual({
      color: Colors.white,
      fontSize: expect.any(Number), // Use `expect.any(Number)` to match the dynamic value of RFPercentage
      fontFamily: FontFamily.semiBold,
    });
  });
});
