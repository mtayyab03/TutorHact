import React, { useState } from "react";
import {
  Image,
  TouchableOpacity,
  TextInput,
  View,
  Text,
  StyleSheet,
  Platform,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import * as ImagePicker from "expo-image-picker"; // For profile picture upload

//config
import Colors from "../config/Colors";
import { FontFamily } from "../config/font";
import icons from "../config/icons";

import { db, storage } from "../../firebase"; // Firebase config
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

// componenet
import CustomPicker from "../components/CustomPicker";

const TutorSignUp = ({ navigation }) => {
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [ratePerHour, setRatePerHour] = useState("");
  const [description, setDescription] = useState("");
  const [contact, setContact] = useState("");

  const [profilePicture, setProfilePicture] = useState(null);
  const handleProfilePictureUpload = async () => {
    const options = ["Take a photo", "Choose from gallery", "Cancel"];
    const cancelIndex = 2;

    Alert.alert("Profile Picture", "Choose an option", [
      {
        text: options[0], // 'Take a photo'
        onPress: async () => {
          const cameraPermission =
            await ImagePicker.requestCameraPermissionsAsync();
          if (cameraPermission.granted) {
            let result = await ImagePicker.launchCameraAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.Images,
              allowsEditing: true,
              aspect: [1, 1],
              quality: 0.7,
            });
            if (!result.canceled) {
              const uri = result.assets[0].uri;
              const fileName = uri.split("/").pop();
              const storageRef = ref(storage, `profile_pictures/${fileName}`);

              try {
                const response = await fetch(uri);
                const blob = await response.blob();
                await uploadBytes(storageRef, blob);
                const downloadURL = await getDownloadURL(storageRef);
                setProfilePicture(downloadURL);
              } catch (error) {
                console.error("Error uploading image: ", error);
              }
            }
          }
        },
      },
      {
        text: options[1], // 'Choose from gallery'
        onPress: async () => {
          const galleryPermission =
            await ImagePicker.requestMediaLibraryPermissionsAsync();
          if (galleryPermission.granted) {
            let result = await ImagePicker.launchImageLibraryAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.Images,
              allowsEditing: true,
              aspect: [1, 1],
              quality: 0.7,
            });
            if (!result.canceled) {
              const uri = result.assets[0].uri;
              const fileName = uri.split("/").pop();
              const storageRef = ref(storage, `profile_pictures/${fileName}`);

              try {
                const response = await fetch(uri);
                const blob = await response.blob();
                await uploadBytes(storageRef, blob);
                const downloadURL = await getDownloadURL(storageRef);
                setProfilePicture(downloadURL);
              } catch (error) {
                console.error("Error uploading image: ", error);
              }
            }
          }
        },
      },
      {
        text: options[2], // 'Cancel'
        style: "cancel",
      },
    ]);
  };

  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedOptionAge, setSelectedOptionAge] = useState(null);
  const [selectedOptionGender, setSelectedOptionGender] = useState(null);

  const handleSelectOption = (item) => {
    setSelectedOption(item);
  };
  const handleSelectOptionAge = (item) => {
    setSelectedOptionAge(item);
  };
  const handleSelectOptionGender = (item) => {
    setSelectedOptionGender(item);
  };

  const handleSubmit = async () => {
    const contactRegex = /^\d{8}$/; // Regex to match exactly 8 digits

    if (
      !name ||
      !subject ||
      !ratePerHour ||
      !description ||
      !contact ||
      !selectedOption ||
      !selectedOptionAge ||
      !selectedOptionGender ||
      !profilePicture
    ) {
      Alert.alert("Error", "Please fill all the fields.");
      return;
    }

    if (!contactRegex.test(contact)) {
      Alert.alert("Error", "Contact information must be exactly 8 digits.");
      return;
    }

    try {
      // Query Firestore to check if the contact number already exists
      const querySnapshot = await getDocs(
        query(collection(db, "tutors"), where("contact", "==", contact))
      );

      if (!querySnapshot.empty) {
        // Contact number already exists
        Alert.alert(
          "Error",
          "This contact number is already in use. Please use another number."
        );
        return;
      }

      // Save data to Firestore
      await addDoc(collection(db, "tutors"), {
        name,
        subject,
        ratePerHour,
        description,
        contact,
        experience: selectedOption,
        age: selectedOptionAge,
        gender: selectedOptionGender,
        profilePicture,
      });

      Alert.alert("Success", "Sign up successful!", [
        {
          text: "Back To Home",
          onPress: () => navigation.navigate("HomeScreen"),
        },
      ]);
    } catch (error) {
      Alert.alert("Error", "Something went wrong, please try again.");
      console.log("Firestore error: ", error);
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
                justifyContent: "center",
                position: "absolute",
                bottom: 0,
              }}
            >
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => navigation.goBack()}
                style={{ position: "absolute", left: 0 }}
              >
                <FontAwesome5
                  name="chevron-left"
                  color={Colors.white}
                  size={24}
                />
              </TouchableOpacity>
              <Image
                style={{ width: RFPercentage(8), height: RFPercentage(8) }}
                source={icons.logo}
              />
            </View>
          </LinearGradient>

          <Text
            style={{
              fontSize: RFPercentage(2),
              color: Colors.primary,
              fontFamily: FontFamily.semiBold,
              marginTop: RFPercentage(1),
              marginBottom: RFPercentage(0.3),
            }}
          >
            SIGN UP AS TUTOR
          </Text>

          {/* text fields */}
          <TextInput
            placeholder="Full name"
            value={name}
            onChangeText={setName}
            style={styles.inputfield}
            placeholderTextColor={Colors.darkgrey}
          />

          {/* Profile Picture Upload */}

          <View style={{ width: "90%", marginTop: RFPercentage(1) }}>
            <Text
              style={{
                fontSize: RFPercentage(1.8),
                color: Colors.blacky,
                fontFamily: FontFamily.semiBold,
                marginBottom: RFPercentage(0.3),
              }}
            >
              Profile Picture :
            </Text>
          </View>
          <View
            style={{
              width: RFPercentage(15),
              height: RFPercentage(15),
              borderWidth: RFPercentage(0.1),
              borderColor: Colors.primary,
              borderRadius: RFPercentage(2),
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
              marginBottom: RFPercentage(1),
            }}
          >
            <TouchableOpacity onPress={handleProfilePictureUpload}>
              <View style={{ alignItems: "center" }}>
                {profilePicture ? (
                  <Image
                    source={{ uri: profilePicture }}
                    style={{
                      width: RFPercentage(15),
                      height: RFPercentage(15),
                      borderRadius: RFPercentage(2),
                    }}
                  />
                ) : (
                  <FontAwesome
                    name="camera"
                    size={RFPercentage(5)}
                    color={Colors.primary}
                  />
                )}
              </View>
            </TouchableOpacity>
          </View>

          {/* picker */}

          {/* Subject Input */}
          <View style={{ width: "70%" }}>
            <CustomPicker
              options={[
                "18-25 years",
                "26-35 years",
                "35-40 years",
                "above 40 years",
              ]}
              selectedItem={selectedOptionAge}
              onSelect={handleSelectOptionAge}
              title="Age"
            />
          </View>
          <View style={{ width: "70%" }}>
            <CustomPicker
              options={["1-3 year", "3-5 year", "more than 5"]}
              selectedItem={selectedOption}
              onSelect={handleSelectOption}
              title="Experience"
            />
          </View>
          <View style={{ width: "70%" }}>
            <CustomPicker
              options={["Male", "Female", "Prefer not Say"]}
              selectedItem={selectedOptionGender}
              onSelect={handleSelectOptionGender}
              title="Gender"
            />
          </View>
          <TextInput
            placeholder="Subject"
            value={subject}
            onChangeText={setSubject}
            style={styles.inputfield}
            placeholderTextColor={Colors.darkgrey}
          />
          {/* Rate per Hour Input */}
          <TextInput
            placeholder="Rate per hour"
            value={ratePerHour}
            onChangeText={setRatePerHour}
            keyboardType="numeric"
            style={styles.inputfield}
            placeholderTextColor={Colors.darkgrey}
          />
          {/* Rate per Hour Input */}
          <TextInput
            placeholder="Contact Information"
            value={contact}
            onChangeText={setContact}
            style={styles.inputfield}
            placeholderTextColor={Colors.darkgrey}
          />
          <TextInput
            placeholder="Enter description"
            value={description}
            onChangeText={setDescription}
            multiline
            style={[
              styles.inputfield,
              { height: RFPercentage(7), borderRadius: RFPercentage(2) },
            ]}
            placeholderTextColor={Colors.darkgrey}
          />

          {/* button */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              width: "90%",
              justifyContent: "space-between",
            }}
          >
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={[styles.submitButton, { backgroundColor: Colors.grey }]}
            >
              <Text style={styles.submitText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleSubmit}
              style={styles.submitButton}
            >
              <Text style={styles.submitText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default TutorSignUp;

const styles = StyleSheet.create({
  inputfield: {
    width: "90%",
    borderWidth: RFPercentage(0.16),
    borderColor: Colors.primary,
    borderRadius: "50%",
    padding: RFPercentage(1.5),
    marginVertical: RFPercentage(0.8),
    paddingLeft: RFPercentage(2),
  },
  submitButton: {
    width: RFPercentage(10),
    backgroundColor: Colors.primary,
    padding: RFPercentage(1),
    borderRadius: RFPercentage(0.8),
    alignItems: "center",
    marginVertical: RFPercentage(1),
  },
  submitText: {
    color: Colors.white,
    fontSize: RFPercentage(1.6),
    fontFamily: FontFamily.bold,
  },
  container: {
    width: "60%",
    marginVertical: RFPercentage(1),
  },
  pickerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: RFPercentage(1),
    backgroundColor: Colors.white,
    borderWidth: RFPercentage(0.1),
    borderColor: Colors.primary,
    borderRadius: RFPercentage(5),
  },
  pickerText: {
    color: Colors.blacky,
    fontFamily: FontFamily.regular,
    fontSize: RFPercentage(1.5),
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: "50%",
    backgroundColor: Colors.white,
    borderRadius: RFPercentage(1),
    alignItems: "center",
    justifyContent: "center",
    elevation: 5, // Shadow for Android
    paddingVertical: RFPercentage(1),
    borderWidth: RFPercentage(0.2),
    borderColor: Colors.primary,
  },
  option: {
    width: "100%",
    paddingVertical: RFPercentage(1),

    alignItems: "center",
    justifyContent: "center",
  },
  optionText: {
    color: Colors.blacky,
    fontFamily: FontFamily.regular,
    fontSize: RFPercentage(1.5),
  },
  closeButton: {
    alignItems: "flex-end",
  },
});
