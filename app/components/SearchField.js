import React, { useState } from "react";
import {
  Image,
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  TextInput,
  FlatList,
} from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";

//config
import Colors from "../config/Colors";
import { FontFamily } from "../config/font";

export default function SearchField({ title, imageSource }) {
  const [link, onChangeLink] = useState("");

  return (
    <View style={styles.searchmain}>
      <View style={styles.innermain}>
        <TextInput
          style={styles.inputtext}
          onChangeText={onChangeLink}
          value={link}
          placeholder={title}
          placeholderTextColor={Colors.grey}
        />
        <Image style={styles.img} source={imageSource} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  searchmain: {
    width: "90%",
    backgroundColor: Colors.fieldcolor,
    padding: RFPercentage(1),
    paddingHorizontal: RFPercentage(2),
    borderRadius: RFPercentage(1.5),
    borderWidth: RFPercentage(0.1),
    borderColor: Colors.stroke,
    height: RFPercentage(6.5),
    justifyContent: "center",
    marginTop: RFPercentage(2),
  },

  innermain: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  img: { width: RFPercentage(3), height: RFPercentage(3) },

  inputtext: {
    fontSize: RFPercentage(2),
    color: Colors.blacky,
    fontFamily: FontFamily.regular,
  },
});
