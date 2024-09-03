import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
//config
import Colors from "../config/Colors";
import { FontFamily } from "../config/font";
import { RFPercentage } from "react-native-responsive-fontsize";

const TitleFfield = ({
  title,
  subtitle,
  keyboardType = "default",
  value,
  onChangeText,
  validation,
  editable,
  selectTextOnFocus,
}) => {
  const [error, setError] = useState("");
  const handleValidation = () => {
    if (validation) {
      if (
        !value ||
        value.length < validation.minLength ||
        value.length > validation.maxLength
      ) {
        setError(
          `Please enter ${title.toLowerCase()} between ${
            validation.minLength
          } - ${validation.maxLength} characters`
        );
      } else {
        setError("");
      }
    }
  };

  return (
    <>
      <View
        style={{
          width: "90%",
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            marginVertical: RFPercentage(1),
            fontSize: RFPercentage(1.8),
            color: Colors.blacky,
            fontFamily: FontFamily.medium,
          }}
        >
          {title}
        </Text>
      </View>

      <View
        style={{
          width: "90%",
          borderRadius: RFPercentage(1),
          borderWidth: RFPercentage(0.1),
          borderColor: error ? Colors.red : Colors.primary,
          height: RFPercentage(6.5),
          justifyContent: "center",
          padding: RFPercentage(2),
        }}
      >
        <View style={{ width: "90%", justifyContent: "center" }}>
          <TextInput
            style={{ width: RFPercentage(45), fontSize: RFPercentage(1.5) }}
            onChangeText={onChangeText}
            value={value}
            placeholder={subtitle}
            placeholderTextColor={Colors.lightgrey}
            keyboardType={keyboardType}
            onBlur={handleValidation}
            editable={editable} // Ensure this is properly passed
            selectTextOnFocus={selectTextOnFocus} // Ensure this is properly passed
          />
        </View>
      </View>
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </>
  );
};

const styles = StyleSheet.create({
  error: {
    color: Colors.red,
    fontSize: RFPercentage(1.5),
    marginTop: RFPercentage(0.5),
  },
});

export default TitleFfield;
