import React, { useState, useEffect } from "react";
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

// componenets
import HeartRating from "../components/HeartRating";
import Header from "../components/Header";

//config
import Colors from "../config/Colors";
import { FontFamily } from "../config/font";
import icons from "../config/icons";

const HomeScreen = (props) => {
  const tutorList = [
    {
      id: 1,
      ImageSource: icons.per2,
      name: "Milish Maze",
      subject: "Math",
      age: "18-25",
      gender: "Male",
      rateperhour: "30$",
      contact: "89330589",
      description:
        "I’m a passionate math tutor who loves making complex concepts approachable and engaging. My teaching style is vibrant and interactive, combining clear explanations with hands-on problem-solving techniques. With years of experience and a deep understanding of various mathematical disciplines, I tailor my approach to meet each student’s unique needs. My enthusiasm for math is contagious, helping to create a positive learning environment where students feel confident and motivated.",
      experience: "3-5 years",
      hearts: "5",
      isFavorite: false,
    },
    {
      id: 2,
      ImageSource: icons.per3,
      name: "Aina Asif",
      subject: "English",
      age: "18-25",
      gender: "Female",
      rateperhour: "40$",
      contact: "89330589",
      description:
        "I’m a passionate math tutor who loves making complex concepts approachable and engaging. My teaching style is vibrant and interactive, combining clear explanations with hands-on problem-solving techniques. With years of experience and a deep understanding of various mathematical disciplines, I tailor my approach to meet each student’s unique needs. My enthusiasm for math is contagious, helping to create a positive learning environment where students feel confident and motivated.",
      experience: "5-7 year",
      hearts: "4",
      isFavorite: false,
    },
    {
      id: 3,
      ImageSource: icons.per4,
      name: "Rameen",
      subject: "Biology",
      age: "18-25",
      gender: "Female",
      rateperhour: "30$",
      contact: "89330589",
      description:
        "I’m a passionate math tutor who loves making complex concepts approachable and engaging. My teaching style is vibrant and interactive, combining clear explanations with hands-on problem-solving techniques. With years of experience and a deep understanding of various mathematical disciplines, I tailor my approach to meet each student’s unique needs. My enthusiasm for math is contagious, helping to create a positive learning environment where students feel confident and motivated.",

      experience: "2-3 year",
      hearts: "3",
      isFavorite: false,
    },
    {
      id: 4,
      ImageSource: icons.per2,
      name: "Alina Will",
      subject: "Math",
      age: "18-25",
      gender: "Male",
      rateperhour: "20$",
      contact: "89330589",
      description:
        "I’m a passionate math tutor who loves making complex concepts approachable and engaging. My teaching style is vibrant and interactive, combining clear explanations with hands-on problem-solving techniques. With years of experience and a deep understanding of various mathematical disciplines, I tailor my approach to meet each student’s unique needs. My enthusiasm for math is contagious, helping to create a positive learning environment where students feel confident and motivated.",

      experience: "3-5 years",
      hearts: "5",
      isFavorite: false,
    },
    {
      id: 5,
      ImageSource: icons.per3,
      name: "Laiba Rani",

      subject: "Chemistry",
      age: "18-25",
      gender: "Male",
      rateperhour: "15$",
      contact: "89330589",
      description:
        "I’m a passionate math tutor who loves making complex concepts approachable and engaging. My teaching style is vibrant and interactive, combining clear explanations with hands-on problem-solving techniques. With years of experience and a deep understanding of various mathematical disciplines, I tailor my approach to meet each student’s unique needs. My enthusiasm for math is contagious, helping to create a positive learning environment where students feel confident and motivated.",
      experience: "5-7 year",
      hearts: "4",

      isFavorite: false,
    },
  ];
  const [cards, setCards] = useState(tutorList);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTutor = cards.filter(
    (tutor) =>
      tutor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tutor.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Toggle favorite function
  const toggleFavorite = (id) => {
    setCards((prevCards) =>
      prevCards.map((card) =>
        card.id === id ? { ...card, isFavorite: !card.isFavorite } : card
      )
    );
  };

  return (
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
          props.navigation.navigate("TutorSignUp");
        }}
      />

      {/* search */}
      <View
        style={{
          width: "100%",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View style={styles.searchmain}>
          <Feather name="search" color={Colors.blacky} size={18} />
          <TextInput
            style={styles.inputtext}
            onChangeText={setSearchQuery}
            value={searchQuery}
            placeholder="Search"
            placeholderTextColor={Colors.lightgrey}
          />
        </View>
      </View>

      <View style={{ width: "90%" }}>
        <Text
          style={{
            fontSize: RFPercentage(1.8),
            color: Colors.blacky,
            fontFamily: FontFamily.semiBold,
            marginBottom: RFPercentage(0.3),
          }}
        >
          Tutor Profiles
        </Text>
      </View>

      <ScrollView
        contentContainerStyle={{
          alignItems: "center",
          paddingBottom: RFPercentage(10),
        }}
        showsVerticalScrollIndicator={false}
        style={{
          width: "100%",
        }}
      >
        {filteredTutor.map((item, i) => (
          <View
            key={i}
            style={{
              width: "90%",
              marginTop: RFPercentage(1.5),
              padding: RFPercentage(1.5),
              backgroundColor: Colors.white,
              borderWidth: RFPercentage(0.1),
              borderColor: Colors.lightWhite,
              borderRadius: RFPercentage(1),
              flexDirection: "row",
            }}
          >
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => {
                props.navigation.navigate("TutorDetail", {
                  tutorData: {
                    ImageSource: item.ImageSource,
                    name: item.name,
                    subject: item.subject,
                    age: item.age,
                    gender: item.gender,
                    rateperhour: item.rateperhour,
                    contact: item.contact,
                    description: item.description,
                    experience: item.experience,
                    hearts: item.hearts,
                    isFavorite: item.isFavorite,
                  },
                });
              }}
              style={{
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
              }}
            >
              <Image
                style={{
                  width: RFPercentage(9),
                  height: RFPercentage(9),
                  borderRadius: RFPercentage(1),
                }}
                source={item.ImageSource}
              />
            </TouchableOpacity>
            <View style={{ marginLeft: RFPercentage(2), width: "70%" }}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  width: "100%",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{
                    color: Colors.primary,
                    fontFamily: FontFamily.medium,
                    fontSize: RFPercentage(1.8),
                  }}
                >
                  {item.name}
                </Text>
                <TouchableOpacity
                  onPress={() => toggleFavorite(item.id)}
                  style={{
                    position: "absolute",
                    right: 0,
                    bottom: RFPercentage(1.5),
                  }}
                >
                  <Fontisto
                    name="favorite"
                    color={item.isFavorite ? Colors.primary : Colors.grey}
                    size={24}
                  />
                </TouchableOpacity>
              </View>
              <Text
                style={{
                  marginTop: RFPercentage(0.5),
                  color: Colors.blacky,
                  fontFamily: FontFamily.regular,
                  fontSize: RFPercentage(1.2),
                }}
              >
                Experience: {item.experience}
              </Text>
              <View
                style={{
                  marginTop: RFPercentage(1),
                  flexDirection: "row",
                  width: "100%",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                }}
              >
                <Text
                  style={{
                    color: Colors.blacky,
                    fontFamily: FontFamily.regular,
                    fontSize: RFPercentage(1.2),
                  }}
                >
                  Subject: {item.subject}
                </Text>
              </View>
              <View
                style={{
                  width: "100%",
                  justifyContent: "flex-end",
                  alignItems: "flex-end",
                }}
              >
                <HeartRating rating={item.hearts} />
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
                    {item.hearts} hearts
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
const styles = StyleSheet.create({
  searchmain: {
    width: "90%",
    padding: RFPercentage(1),
    paddingHorizontal: RFPercentage(2),
    borderRadius: RFPercentage(5),
    borderWidth: RFPercentage(0.1),
    borderColor: Colors.primary,
    height: RFPercentage(5.5),
    marginVertical: RFPercentage(1.5),
    flexDirection: "row",
    alignItems: "center",
  },
  heart: {
    marginHorizontal: 5,
  },
  img: {
    width: RFPercentage(2.5),
    height: RFPercentage(2.5),
    marginLeft: RFPercentage(1),
    marginTop: RFPercentage(0.5),
  },

  inputtext: {
    fontSize: RFPercentage(1.5),
    color: Colors.blacky,
    fontFamily: FontFamily.regular,
    marginLeft: RFPercentage(1),
  },
  buttontext: {
    color: Colors.white,
    fontSize: RFPercentage(1),
    fontFamily: FontFamily.medium,
  },
});
