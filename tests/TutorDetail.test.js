// TutorDetail.test.js
import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import TutorDetail from "../app/screens/TutorDetail";
import { db } from "../../firebase";
import { collection, getDocs, addDoc } from "firebase/firestore";

jest.mock("@firebase/firestore", () => ({
  collection: jest.fn(),
  getDocs: jest.fn(),
  addDoc: jest.fn(),
}));

describe("TutorDetail", () => {
  const mockNavigation = {
    navigate: jest.fn(),
    goBack: jest.fn(),
  };

  const tutorData = {
    id: "tutor1",
    name: "John Doe",
    profilePicture: "http://example.com/profile.jpg",
    age: 30,
    experience: "5 years",
    gender: "Male",
    subject: "Mathematics",
    ratePerHour: "$50",
    contact: "123456789",
    averageRating: 4,
    description: "An experienced tutor in Mathematics.",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders tutor details correctly", () => {
    const { getByText, getByTestId } = render(
      <TutorDetail
        route={{ params: { tutorData } }}
        navigation={mockNavigation}
      />
    );

    expect(getByText(tutorData.name)).toBeTruthy();
    expect(getByText(`Age: ${tutorData.age}`)).toBeTruthy();
    expect(getByText(`Experience: ${tutorData.experience}`)).toBeTruthy();
    expect(getByText(`Gender: ${tutorData.gender}`)).toBeTruthy();
    expect(getByText(`Subject: ${tutorData.subject}`)).toBeTruthy();
    expect(getByText(`Rate per hour: ${tutorData.ratePerHour}`)).toBeTruthy();
    expect(getByText(`Contact Information: ${tutorData.contact}`)).toBeTruthy();
    expect(getByText(`Description :`)).toBeTruthy();
    expect(getByText(tutorData.description)).toBeTruthy();
  });

  it("fetches and displays reviews correctly", async () => {
    const mockReviews = [
      { review: "Great tutor!", rating: 5 },
      { review: "Very helpful.", rating: 4 },
    ];

    getDocs.mockResolvedValue({
      docs: mockReviews.map((review) => ({
        data: () => review,
      })),
    });

    const { getByText } = render(
      <TutorDetail
        route={{ params: { tutorData } }}
        navigation={mockNavigation}
      />
    );

    await waitFor(() => {
      expect(getByText("Great tutor!")).toBeTruthy();
      expect(getByText("Very helpful.")).toBeTruthy();
    });
  });

  it("submits a review correctly", async () => {
    addDoc.mockResolvedValue({ id: "new-review-id" });

    const { getByPlaceholderText, getByText } = render(
      <TutorDetail
        route={{ params: { tutorData } }}
        navigation={mockNavigation}
      />
    );

    fireEvent.changeText(
      getByPlaceholderText("Write your review here..."),
      "Excellent tutor!"
    );
    fireEvent.press(getByText("Submit"));

    await waitFor(() => {
      expect(addDoc).toHaveBeenCalledWith(
        collection(db, "tutors", tutorData.id, "reviews"),
        {
          review: "Excellent tutor!",
          rating: 0, // Assuming default rating is 0
        }
      );
    });
  });
});
