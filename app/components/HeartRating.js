import React from "react";
import { View, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons"; // Import FontAwesome from Expo
import Colors from "../config/Colors";

const HeartRating = ({ rating }) => {
  // Create an array with 5 elements for 5 hearts
  const hearts = Array(5).fill(0);

  return (
    <View style={styles.container}>
      {hearts.map((_, index) => (
        <FontAwesome
          key={index}
          name={index < rating ? "heart" : "heart-o"} // Full heart if index is less than rating, otherwise empty heart
          size={16}
          color={Colors.red}
          style={styles.heart}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  heart: {
    marginHorizontal: 2,
  },
});

export default HeartRating;
