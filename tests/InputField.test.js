import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import InputField from "../app/components/InputField"; // Adjust the import path as needed
import Colors from "../app/config/Colors";

describe("InputField", () => {
  const mockOnChange = jest.fn();

  test("renders with placeholder text", () => {
    const { getByPlaceholderText } = render(
      <InputField
        placeTitle="Enter your text"
        value=""
        onChange={mockOnChange}
      />
    );
    expect(getByPlaceholderText("Enter your text")).toBeTruthy();
  });

  test("calls onChange with correct value when text is input", () => {
    const { getByPlaceholderText } = render(
      <InputField
        placeTitle="Enter your text"
        value=""
        onChange={mockOnChange}
      />
    );

    const input = getByPlaceholderText("Enter your text");
    fireEvent.changeText(input, "New Value");

    expect(mockOnChange).toHaveBeenCalledWith("New Value");
  });

  test("applies correct styles", () => {
    const { getByPlaceholderText } = render(
      <InputField
        placeTitle="Enter your text"
        value=""
        onChange={mockOnChange}
      />
    );

    const input = getByPlaceholderText("Enter your text");
    expect(input.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          height: expect.any(Number),
          backgroundColor: Colors.white,
          borderWidth: expect.any(Number),
          borderRadius: expect.any(Number),
          borderColor: Colors.primary,
          paddingHorizontal: expect.any(Number),
          justifyContent: "center",
          marginTop: expect.any(Number),
        }),
      ])
    );
  });
});
