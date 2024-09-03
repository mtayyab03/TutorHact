import React, { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ScrollView,
  View,
  Text,
  TextInput,
  ImageBackground,
} from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";

//config
import Colors from "../config/Colors";
import { FontFamily } from "../config/font";

export default function TextTwoEnd({ title, subtitle, textColor }) {
  return (
    <View
      style={{
        width: "90%",
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: RFPercentage(2),
      }}
    >
      <Text
        style={{
          fontFamily: FontFamily.medium,
          fontSize: RFPercentage(1.7),
          color: textColor,
        }}
      >
        {title}
      </Text>

      <Text
        style={{
          fontFamily: FontFamily.medium,
          fontSize: RFPercentage(1.7),
          color: textColor,
        }}
      >
        {subtitle}
      </Text>
    </View>
  );
}
