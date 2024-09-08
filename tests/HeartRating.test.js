// HeartRating.test.js
import React from "react";
import { render } from "@testing-library/react-native";
import HeartRating from "../app/components/HeartRating";

it("renders correctly with rating 5", () => {
  const rating = 5;
  const tree = render(<HeartRating rating={rating} />);
  expect(tree).toMatchSnapshot();
});
