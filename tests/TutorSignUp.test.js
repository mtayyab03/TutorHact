import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import TutorSignUp from "../app/screens/TutorSignUp"; // Adjust the import path as needed
import * as ImagePicker from "expo-image-picker";
import { db } from "../../firebase"; // Adjust the import path as needed
import { collection, addDoc } from "firebase/firestore";

jest.mock("expo-image-picker", () => ({
  launchImageLibraryAsync: jest.fn(),
}));

jest.mock("firebase/firestore", () => ({
  collection: jest.fn(),
  addDoc: jest.fn(),
}));

describe("TutorSignUp Screen", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders correctly", () => {
    const { getByPlaceholderText, getByText } = render(
      <TutorSignUp navigation={{ navigate: jest.fn() }} />
    );
    expect(getByPlaceholderText("Full name")).toBeTruthy();
    expect(getByPlaceholderText("Subject")).toBeTruthy();
    expect(getByPlaceholderText("Rate per hour")).toBeTruthy();
    expect(getByPlaceholderText("Contact Information")).toBeTruthy();
    expect(getByPlaceholderText("Enter description")).toBeTruthy();
    expect(getByText("SIGN UP AS TUTOR")).toBeTruthy();
  });

  test("handles profile picture upload", async () => {
    const mockUri = "http://example.com/photo.jpg";
    ImagePicker.launchImageLibraryAsync.mockResolvedValue({
      cancelled: false,
      assets: [{ uri: mockUri }],
    });

    const { getByText, getByRole } = render(
      <TutorSignUp navigation={{ navigate: jest.fn() }} />
    );

    fireEvent.press(getByText("camera")); // Press the camera icon to open the image picker
    await waitFor(() => {
      expect(ImagePicker.launchImageLibraryAsync).toHaveBeenCalled();
      expect(getByRole("img")).toHaveProp("source", { uri: mockUri });
    });
  });

  test("submits form successfully", async () => {
    addDoc.mockResolvedValue({});
    const { getByPlaceholderText, getByText } = render(
      <TutorSignUp navigation={{ navigate: jest.fn() }} />
    );

    fireEvent.changeText(getByPlaceholderText("Full name"), "John Doe");
    fireEvent.changeText(getByPlaceholderText("Subject"), "Math");
    fireEvent.changeText(getByPlaceholderText("Rate per hour"), "30");
    fireEvent.changeText(
      getByPlaceholderText("Contact Information"),
      "1234567890"
    );
    fireEvent.changeText(
      getByPlaceholderText("Enter description"),
      "Experienced tutor"
    );

    // Mock selecting options
    fireEvent.press(getByText("Age")); // Assuming the picker titles are visible
    fireEvent.press(getByText("18-25 years"));
    fireEvent.press(getByText("Experience"));
    fireEvent.press(getByText("1-3 year"));
    fireEvent.press(getByText("Gender"));
    fireEvent.press(getByText("Male"));

    fireEvent.press(getByText("Submit"));

    await waitFor(() => {
      expect(addDoc).toHaveBeenCalledWith(expect.anything(), {
        name: "John Doe",
        subject: "Math",
        ratePerHour: "30",
        description: "Experienced tutor",
        contact: "1234567890",
        experience: "1-3 year",
        age: "18-25 years",
        gender: "Male",
        profilePicture: null,
      });
    });
  });

  test("shows error message on empty fields", async () => {
    const { getByText } = render(
      <TutorSignUp navigation={{ navigate: jest.fn() }} />
    );

    fireEvent.press(getByText("Submit"));

    await waitFor(() => {
      expect(getByText("Error")).toBeTruthy();
      expect(getByText("Please fill all the fields.")).toBeTruthy();
    });
  });
});
