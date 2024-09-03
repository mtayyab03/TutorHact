import React, { useEffect } from "react";
import { View, StyleSheet, Image, TouchableOpacity, Text } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import { LinearGradient } from "expo-linear-gradient";
//config
import Colors from "../config/Colors";
import icons from "../config/icons";

export default function SplashScreen(props) {
  useEffect(() => {
    // After 3 seconds, navigate to LoginScreen
    const timer = setTimeout(() => {
      props.navigation.navigate("BottomTab");
    }, 3000);

    // Clear the timer when the component unmounts
    return () => clearTimeout(timer);
  }, []);
  return (
    <LinearGradient
      colors={[Colors.primary, Colors.secondary]} // Define your two gradient colors here
      start={{ x: 0, y: 0 }} // Start point (top-left)
      end={{ x: 1, y: 1 }} // End point (bottom-right)
      style={styles.background}
    >
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => {
          props.navigation.navigate("BottomTab");
        }}
      >
        <Image style={styles.logo} source={icons.logo} />
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: Colors.white,
    alignItems: "center",
    justifyContent: "center",
  },

  logo: {
    width: RFPercentage(30),
    height: RFPercentage(30),
  },
});
