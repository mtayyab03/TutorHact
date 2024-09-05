import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import CustomPicker from "../app/components/CustomPicker"; // Adjust the import path as needed

describe("CustomPicker", () => {
  const mockOnSelect = jest.fn();

  const options = ["Option 1", "Option 2", "Option 3"];

  test("renders with default title", () => {
    const { getByText } = render(
      <CustomPicker
        options={options}
        selectedItem=""
        onSelect={mockOnSelect}
        title="Select an option"
      />
    );
    expect(getByText("Select an option")).toBeTruthy();
  });

  test("displays selected item", () => {
    const { getByText } = render(
      <CustomPicker
        options={options}
        selectedItem="Option 1"
        onSelect={mockOnSelect}
        title="Select an option"
      />
    );
    expect(getByText("Option 1")).toBeTruthy();
  });

  test("opens and closes the modal on picker press", async () => {
    const { getByText, getByTestId, queryByTestId } = render(
      <CustomPicker
        options={options}
        selectedItem=""
        onSelect={mockOnSelect}
        title="Select an option"
      />
    );

    // Open the modal
    fireEvent.press(getByTestId("picker-button"));
    await waitFor(() => expect(getByTestId("modal-container")).toBeTruthy());

    // Close the modal
    fireEvent.press(getByTestId("close-button"));
    await waitFor(() => expect(queryByTestId("modal-container")).toBeNull());
  });

  test("calls onSelect with the correct item", async () => {
    const { getByTestId, getByText } = render(
      <CustomPicker
        options={options}
        selectedItem=""
        onSelect={mockOnSelect}
        title="Select an option"
      />
    );

    // Open the modal
    fireEvent.press(getByTestId("picker-button"));
    await waitFor(() => expect(getByTestId("modal-container")).toBeTruthy());

    // Select an item
    fireEvent.press(getByText("Option 2"));
    expect(mockOnSelect).toHaveBeenCalledWith("Option 2");
  });
});
