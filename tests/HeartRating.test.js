import React from "react";
import { render } from "@testing-library/react-native";
import HeartRating from "../app/components/HeartRating"; // Adjust the import path as needed
import Colors from "../app/config/Colors";

describe("HeartRating", () => {
  test("renders 5 hearts", () => {
    const { getAllByTestId } = render(<HeartRating rating={5} />);
    const hearts = getAllByTestId("heart-icon");
    expect(hearts).toHaveLength(5); // There should be 5 hearts rendered
  });

  test("renders the correct number of filled hearts", () => {
    const { getAllByTestId } = render(<HeartRating rating={5} />);
    const hearts = getAllByTestId("heart-icon");

    // Check that the first 3 hearts are filled
    expect(hearts[0]).toHaveProp("name", "heart");
    expect(hearts[1]).toHaveProp("name", "heart");
    expect(hearts[2]).toHaveProp("name", "heart");

    // Check that the next 2 hearts are empty
    expect(hearts[3]).toHaveProp("name", "heart-o");
    expect(hearts[4]).toHaveProp("name", "heart-o");
  });

  test("renders the correct color for hearts", () => {
    const { getAllByTestId } = render(<HeartRating rating={5} />);
    const hearts = getAllByTestId("heart-icon");

    hearts.forEach((heart) => {
      expect(heart).toHaveProp("color", Colors.primary);
    });
  });
});
