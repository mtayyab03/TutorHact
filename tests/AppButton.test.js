import React from "react";
import { render } from "@testing-library/react-native";
import AppButton from "../app/components/AppButton";
import Colors from "../app/config/Colors";

describe("AppButton Component", () => {
  it("should apply the correct gradient colors", () => {
    const { getByTestId } = render(
      <AppButton title="Test" buttonColor={Colors.primary} />
    );
    const linearGradient = getByTestId("linear-gradient");

    // Compare directly to the expected integer values
    expect(linearGradient.props.colors).toEqual([
      4278220726, // Equivalent of Colors.primary
      4287684847, // Equivalent of Colors.secondary
    ]);
  });
});
