import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import { LinearGradient } from "expo-linear-gradient";

//config
import Colors from "../config/Colors";
import { FontFamily } from "../config/font";

export default function AppButton({ title, buttonColor }) {
  return (
    <LinearGradient
      colors={[Colors.primary, Colors.secondary]} // Define your two gradient colors here
      start={{ x: 0, y: 0 }} // Start point (top-left)
      end={{ x: 1, y: 1 }} // End point (bottom-right)
      style={{
        width: "90%",
        height: RFPercentage(6.5),
        borderRadius: RFPercentage(1),
        alignItems: "center",
        justifyContent: "center",
        marginTop: RFPercentage(2),
        backgroundColor: buttonColor,
      }}
    >
      <Text style={styles.buttontext}>{title}</Text>
    </LinearGradient>
  );
}
const styles = StyleSheet.create({
  buttontext: {
    color: Colors.white,
    fontSize: RFPercentage(1.8),
    fontFamily: FontFamily.semiBold,
  },
});
