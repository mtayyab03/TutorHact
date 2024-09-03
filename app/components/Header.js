import React from "react";
import {
  Image,
  TouchableOpacity,
  TextInput,
  View,
  Text,
  StyleSheet,
  Platform,
  ScrollView,
} from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import { MaterialIcons, Feather, Fontisto } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

//config
import Colors from "../config/Colors";
import { FontFamily } from "../config/font";
import icons from "../config/icons";

const Header = ({ onpress }) => {
  return (
    <LinearGradient
      colors={[Colors.primary, Colors.secondary]} // Define your two gradient colors here
      start={{ x: 0, y: 0 }} // Start point (top-left)
      end={{ x: 1, y: 1 }} // End point (bottom-right)
      style={{
        width: "100%",
        height: Platform.OS == "ios" ? RFPercentage(12) : RFPercentage(5),
        backgroundColor: Colors.primary,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <View
        style={{
          width: "90%",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          position: "absolute",
          bottom: 0,
        }}
      >
        <Image
          style={{ width: RFPercentage(8), height: RFPercentage(8) }}
          source={icons.logo}
        />

        <TouchableOpacity onPress={onpress} activeOpacity={0.7}>
          <Text
            style={{
              fontSize: RFPercentage(1.7),
              color: Colors.white,
              fontFamily: FontFamily.semiBold,
              marginTop: RFPercentage(2),
            }}
          >
            SIGN UP AS TUTOR
          </Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

export default Header;
