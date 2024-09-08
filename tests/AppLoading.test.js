import React from "react";
import { render } from "@testing-library/react-native";
import AppLoading from "../app/components/AppLoading";

it("renders correctly", () => {
  const tree = render(<AppLoading />);
  expect(tree).toMatchSnapshot();
});
