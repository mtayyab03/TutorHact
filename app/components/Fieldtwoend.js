import React, { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  FlatList,
  TextInput,
} from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import {
  FontAwesome5,
  Octicons,
  AntDesign,
  Feather,
  MaterialIcons,
} from "@expo/vector-icons";

//config
import Colors from "../config/Colors";
import { FontFamily } from "../config/font";

export default function Fieldtwoend({ title, subTitle, imageSource, onpress }) {
  return (
    <View
      style={{
        width: "90%",
        padding: RFPercentage(1),
        borderBottomWidth: RFPercentage(0.1),
        borderColor: Colors.lightgrey,
        justifyContent: "center",
        marginTop: RFPercentage(1.5),
      }}
    >
      <View>
        <Text
          style={{
            fontFamily: FontFamily.regular,
            fontSize: RFPercentage(1.7),
            color: Colors.blacky,
          }}
        >
          {title}
        </Text>
        <View style={{ marginTop: RFPercentage(0.5) }} />
        <Text
          style={{
            fontFamily: FontFamily.regular,
            fontSize: RFPercentage(1.2),
            color: Colors.darkgrey,
          }}
        >
          {subTitle}
        </Text>
      </View>
      <TouchableOpacity
        style={{ position: "absolute", right: RFPercentage(2) }}
        onPress={onpress}
      >
        <Image
          style={{
            width: RFPercentage(3.5),
            height: RFPercentage(3.5),
          }}
          source={imageSource}
        />
      </TouchableOpacity>
    </View>
  );
}
