import React from "react";
import { render } from "@testing-library/react-native";
import AppLine from "../app/components/AppLine";

it("renders correctly", () => {
  const tree = render(<AppLine />);
  expect(tree).toMatchSnapshot();
});
