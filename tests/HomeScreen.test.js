import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import HomeScreen from "../app/screens/HomeScreen";
import { db } from "../firebase";
import { mockFirestore } from "firebase-mock";

// Mock Firestore setup
const mockFirestoreInstance = mockFirestore();
jest.mock("../firebase", () => ({
  db: mockFirestoreInstance,
}));

describe("HomeScreen", () => {
  beforeEach(() => {
    // Set up mock Firestore data
    mockFirestoreInstance.collection("tutors").set([
      {
        id: "1",
        name: "John Doe",
        subject: "Mathematics",
        profilePicture: "https://example.com/john.jpg",
        experience: "5 years",
        averageRating: 4,
        isFavorite: false,
      },
    ]);
  });

  it("renders correctly and displays tutor profiles", async () => {
    const { getByText, getByPlaceholderText, queryByText } = render(
      <HomeScreen />
    );

    // Check if search bar and "Tutor Profiles" text are present
    expect(getByPlaceholderText("Search")).toBeTruthy();
    expect(getByText("Tutor Profiles")).toBeTruthy();

    // Wait for the tutor profile to appear
    await waitFor(() => {
      expect(getByText("John Doe")).toBeTruthy();
    });
  });

  it("filters tutors based on search query", async () => {
    const { getByPlaceholderText, getByText } = render(<HomeScreen />);

    // Enter search query
    fireEvent.changeText(getByPlaceholderText("Search"), "John Doe");

    // Wait for the filtered result
    await waitFor(() => {
      expect(getByText("John Doe")).toBeTruthy();
    });
  });

  it("toggles favorite status", async () => {
    const { getByText, getByTestId } = render(<HomeScreen />);

    // Wait for the favorite icon to appear
    await waitFor(() => {
      const favoriteIcon = getByTestId("favorite-icon");
      expect(favoriteIcon.props.color).toBe("grey"); // Initial color

      // Toggle favorite status
      fireEvent.press(favoriteIcon);

      // Verify that the favorite status was toggled
      expect(favoriteIcon.props.color).toBe("primary"); // After toggling
    });
  });
});
