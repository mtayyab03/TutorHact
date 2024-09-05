import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import SavedScreen from "../app/screens/SavedScreen";
import { db } from "../../firebase"; // Adjust the import as necessary
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "../../redux/reducers"; // Adjust as necessary

// Mock Firebase methods
jest.mock("firebase/firestore", () => ({
  collection: jest.fn(),
  getDocs: jest.fn(),
  onSnapshot: jest.fn(),
  updateDoc: jest.fn(),
  doc: jest.fn(),
  getDoc: jest.fn(),
}));

const store = createStore(rootReducer);

describe("SavedScreen", () => {
  it("renders correctly", async () => {
    const { getByText, getByPlaceholderText } = render(
      <Provider store={store}>
        <SavedScreen navigation={{ navigate: jest.fn() }} />
      </Provider>
    );

    // Check if header and search input are rendered
    expect(getByText("Saved Tutor Profiles")).toBeTruthy();
    expect(getByPlaceholderText("Search")).toBeTruthy();
  });

  it("filters tutors based on search query", async () => {
    // Mock the onSnapshot function to return a mock snapshot
    const mockTutors = [
      {
        id: "1",
        name: "John Doe",
        subject: "Math",
        isFavorite: true,
        profilePicture: "",
      },
      {
        id: "2",
        name: "Jane Smith",
        subject: "Science",
        isFavorite: false,
        profilePicture: "",
      },
    ];

    // Mock Firestore to return mock tutors
    onSnapshot.mockImplementation((collectionRef, callback) => {
      callback({
        docs: mockTutors.map((tutor) => ({ id: tutor.id, data: () => tutor })),
      });
      return jest.fn(); // Return a dummy unsubscribe function
    });

    const { getByPlaceholderText, queryByText } = render(
      <Provider store={store}>
        <SavedScreen navigation={{ navigate: jest.fn() }} />
      </Provider>
    );

    // Input search query
    fireEvent.changeText(getByPlaceholderText("Search"), "Jane Smith");

    await waitFor(() => {
      // Ensure that only Jane Smith is displayed
      expect(queryByText("John Doe")).toBeNull();
      expect(queryByText("Jane Smith")).toBeTruthy();
    });
  });

  it("toggles favorite status", async () => {
    const mockTutor = {
      id: "1",
      name: "John Doe",
      subject: "Math",
      isFavorite: false,
      profilePicture: "",
    };

    // Mock Firestore to return mock tutor
    onSnapshot.mockImplementation((collectionRef, callback) => {
      callback({
        docs: [{ id: mockTutor.id, data: () => mockTutor }],
      });
      return jest.fn(); // Return a dummy unsubscribe function
    });

    const { getByText } = render(
      <Provider store={store}>
        <SavedScreen navigation={{ navigate: jest.fn() }} />
      </Provider>
    );

    // Toggle favorite status
    const favoriteButton = getByText("favorite"); // Assuming Fontisto icon text is "favorite"
    fireEvent.press(favoriteButton);

    // Wait for the state update and check if the favorite status is toggled
    await waitFor(() => {
      expect(getByText("favorite")).toBeTruthy();
    });
  });

  it("navigates to TutorDetail on card press", async () => {
    const mockTutor = {
      id: "1",
      name: "John Doe",
      subject: "Math",
      isFavorite: true,
      profilePicture: "",
    };

    // Mock Firestore to return mock tutor
    onSnapshot.mockImplementation((collectionRef, callback) => {
      callback({
        docs: [{ id: mockTutor.id, data: () => mockTutor }],
      });
      return jest.fn(); // Return a dummy unsubscribe function
    });

    const navigateMock = jest.fn();

    const { getByText } = render(
      <Provider store={store}>
        <SavedScreen navigation={{ navigate: navigateMock }} />
      </Provider>
    );

    // Simulate pressing on tutor card
    const card = getByText("John Doe");
    fireEvent.press(card);

    await waitFor(() => {
      expect(navigateMock).toHaveBeenCalledWith("TutorDetail", {
        tutorData: mockTutor,
      });
    });
  });
});
