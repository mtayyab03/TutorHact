import React, { useState, useEffect } from "react";
import {
  Image,
  TouchableOpacity,
  TextInput,
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
} from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";

// componenets
import HeartRating from "../components/HeartRating";
import Header from "../components/Header";

//config
import Colors from "../config/Colors";
import { FontFamily } from "../config/font";

const TutorDetail = ({ route, navigation }) => {
  const { tutorData } = route.params;
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [reviews, setReviews] = useState([]);
  console.log("tuttor data", tutorData);

  const hearts = Array(5).fill(0);

  const handleRating = (index) => {
    setRating(index + 1);
  };

  const handleSubmit = () => {
    if (reviewText.trim() && rating > 0) {
      const newReview = {
        review: reviewText,
        rating: rating,
      };

      // Update local state
      setReviews((prevReviews) => [...prevReviews, newReview]);
      setReviewText(""); // Clear review input
      setRating(0); // Reset rating
    } else {
      alert("Please write a review and select a rating.");
    }
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "flex-start",
            alignItems: "center",
            backgroundColor: Colors.white,
          }}
        >
          <Header
            onpress={() => {
              navigation.navigate("TutorSignUp");
            }}
          />

          <View
            style={{
              alignItems: "center",
              width: "90%",
              justifyContent: "center",
              flexDirection: "row",
              marginTop: RFPercentage(2),
            }}
          >
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => navigation.goBack()}
              style={{ position: "absolute", left: 0 }}
            >
              <FontAwesome5
                name="chevron-left"
                color={Colors.blacky}
                size={24}
              />
            </TouchableOpacity>
            <Text
              style={{
                color: Colors.primary,
                fontFamily: FontFamily.medium,
                fontSize: RFPercentage(2),
              }}
            >
              {tutorData.name}
            </Text>
          </View>
          <View
            style={{
              width: "90%",
              backgroundColor: Colors.white,
              flexDirection: "row",
              marginTop: RFPercentage(1),
            }}
          >
            <TouchableOpacity
              activeOpacity={0.7}
              style={{
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
              }}
            >
              <Image
                style={{
                  width: RFPercentage(16),
                  height: RFPercentage(22),
                  borderRadius: RFPercentage(1),
                }}
                source={tutorData.profilePicture}
              />
            </TouchableOpacity>
            <View style={{ marginLeft: RFPercentage(2), width: "60%" }}>
              <Text
                style={{
                  marginTop: RFPercentage(0.5),
                  color: Colors.blacky,
                  fontFamily: FontFamily.medium,
                  fontSize: RFPercentage(2),
                }}
              >
                Age: {tutorData.age}
              </Text>
              <Text
                style={{
                  marginTop: RFPercentage(0.5),
                  color: Colors.blacky,
                  fontFamily: FontFamily.medium,
                  fontSize: RFPercentage(2),
                }}
              >
                Experience: {tutorData.experience}
              </Text>
              <Text
                style={{
                  marginTop: RFPercentage(0.5),
                  color: Colors.blacky,
                  fontFamily: FontFamily.medium,
                  fontSize: RFPercentage(2),
                }}
              >
                Gender: {tutorData.gender}
              </Text>

              <Text
                style={{
                  marginTop: RFPercentage(0.5),

                  color: Colors.blacky,
                  fontFamily: FontFamily.medium,
                  fontSize: RFPercentage(2),
                }}
              >
                Subject: {tutorData.subject}
              </Text>
              <Text
                style={{
                  marginTop: RFPercentage(0.5),

                  color: Colors.blacky,
                  fontFamily: FontFamily.medium,
                  fontSize: RFPercentage(2),
                }}
              >
                Rate per hour: {tutorData.ratePerHour} $
              </Text>
              <Text
                style={{
                  marginTop: RFPercentage(0.5),

                  color: Colors.blacky,
                  fontFamily: FontFamily.medium,
                  fontSize: RFPercentage(2),
                }}
              >
                Contact Information: {tutorData.contact}
              </Text>
              <View
                style={{
                  width: "95%",
                  justifyContent: "flex-end",
                  alignItems: "flex-end",
                  marginTop: RFPercentage(1),
                }}
              >
                <HeartRating rating={tutorData.averageRating} />
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={{ flexDirection: "row" }}
                >
                  <Text
                    style={{
                      color: Colors.lightgrey,
                      fontFamily: FontFamily.semiBold,
                      fontSize: RFPercentage(1.2),
                      marginTop: RFPercentage(0.3),
                    }}
                  >
                    {tutorData.averageRating} hearts
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={{ width: "90%" }}>
            <Text
              style={{
                fontSize: RFPercentage(1.8),
                color: Colors.blacky,
                fontFamily: FontFamily.medium,
              }}
            >
              Description :
            </Text>
            <Text
              style={{
                fontSize: RFPercentage(1.6),
                color: Colors.blacky,
                fontFamily: FontFamily.medium,
                marginTop: RFPercentage(1),
                lineHeight: RFPercentage(2),
              }}
            >
              {tutorData.description}
            </Text>
          </View>

          {/* review */}
          <View style={{ width: "90%" }}>
            <Text
              style={{
                fontSize: RFPercentage(1.8),
                color: Colors.blacky,
                fontFamily: FontFamily.medium,
                marginTop: RFPercentage(1.2),
              }}
            >
              Reviews :
            </Text>
          </View>

          {reviews.map((review, index) => (
            <View
              key={index}
              style={{
                width: "90%",
                marginTop: RFPercentage(1),
                padding: RFPercentage(1),
                backgroundColor: Colors.white,
                borderWidth: RFPercentage(0.1),
                borderColor: Colors.primary,
                borderRadius: RFPercentage(1),
              }}
            >
              {/* Review Description */}
              <Text
                style={{
                  color: Colors.blacky,
                  fontFamily: FontFamily.regular,
                  fontSize: RFPercentage(1.6),
                }}
              >
                {review.review}
              </Text>

              {/* Heart Rating and Number of Hearts */}
              <View
                style={{
                  width: "95%",
                  justifyContent: "flex-end",
                  alignItems: "flex-end",
                  marginTop: RFPercentage(1),
                }}
              >
                {/* Heart Rating */}
                <HeartRating rating={review.rating} />

                {/* Number of Hearts */}
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={{ flexDirection: "row" }}
                >
                  <Text
                    style={{
                      color: Colors.lightgrey,
                      fontFamily: FontFamily.semiBold,
                      fontSize: RFPercentage(1.2),
                      marginTop: RFPercentage(0.3),
                    }}
                  >
                    {review.rating} hearts
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}

          {/* write review */}
          <View style={{ width: "90%" }}>
            <Text
              style={{
                fontSize: RFPercentage(1.3),
                color: Colors.blacky,
                fontFamily: FontFamily.medium,
                marginTop: RFPercentage(2),
              }}
            >
              Write a review :
            </Text>
          </View>

          <View
            style={{
              width: "90%",
              marginTop: RFPercentage(1),
              padding: RFPercentage(1),
              backgroundColor: Colors.secondary,
              borderWidth: RFPercentage(0.1),
              borderColor: Colors.primary,
              borderRadius: RFPercentage(1),
              alignItems: "flex-end",
            }}
          >
            <TextInput
              style={styles.textInput}
              placeholder="Write your review here..."
              value={reviewText}
              onChangeText={setReviewText}
              multiline
            />

            {/* Heart Rating System */}
            <View
              style={{ alignItems: "flex-end", marginBottom: RFPercentage(1) }}
            >
              <View style={styles.heartContainer}>
                {hearts.map((_, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => handleRating(index)}
                  >
                    <FontAwesome
                      name={index < rating ? "heart" : "heart-o"}
                      size={RFPercentage(2)}
                      color={Colors.primary}
                      style={styles.heart}
                    />
                  </TouchableOpacity>
                ))}
              </View>
              <Text
                style={{
                  color: Colors.primary,
                  fontFamily: FontFamily.semiBold,
                  fontSize: RFPercentage(1.2),
                }}
              >
                {rating} hearts
              </Text>
            </View>

            {/* Submit Button */}
            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleSubmit}
            >
              <Text style={styles.submitText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default TutorDetail;
const styles = StyleSheet.create({
  textInput: {
    width: "100%",
    height: RFPercentage(8),
    borderWidth: RFPercentage(0.1),
    borderColor: Colors.primary,
    borderRadius: RFPercentage(1),
    padding: RFPercentage(1.5),
    fontSize: RFPercentage(1.5),
    marginBottom: RFPercentage(1),
    fontFamily: FontFamily.regular,
    color: Colors.blacky,
    backgroundColor: Colors.white,
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  heartContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: RFPercentage(0.3),
  },
  heart: {
    marginHorizontal: RFPercentage(0.5),
  },
  submitButton: {
    width: RFPercentage(10),
    backgroundColor: Colors.primary,
    padding: RFPercentage(1),
    borderRadius: RFPercentage(1),
    alignItems: "center",
    marginVertical: RFPercentage(1),
  },
  submitText: {
    color: Colors.white,
    fontSize: RFPercentage(1.6),
    fontFamily: FontFamily.bold,
  },
  reviewsContainer: {
    marginTop: RFPercentage(1),
  },
  reviewItem: {
    marginBottom: RFPercentage(2),
  },
  reviewText: {
    fontSize: RFPercentage(2),
    fontFamily: FontFamily.regular,
    color: Colors.blacky,
  },
  reviewRating: {
    flexDirection: "row",
    marginTop: RFPercentage(0.5),
  },
});
