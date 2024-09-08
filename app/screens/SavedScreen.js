import React, { useState, useEffect } from "react";
import {
  Image,
  TouchableOpacity,
  TextInput,
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import { Feather, Fontisto } from "@expo/vector-icons";

// componenets
import HeartRating from "../components/HeartRating";
import Header from "../components/Header";
import CustomPicker from "../components/CustomPicker";

//config
import Colors from "../config/Colors";
import { FontFamily } from "../config/font";
import icons from "../config/icons";

const SavedScreen = (props) => {
  const [loading, setLoading] = useState(true); // Add this state for loading
  const [cards, setCards] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedOptionGender, setSelectedOptionGender] = useState(null);
  const handleSelectOption = (item) => {
    setSelectedOption(item);
  };

  const handleSelectOptionGender = (item) => {
    setSelectedOptionGender(item);
  };
  const clearFilters = () => {
    setSelectedOption(null);
    setSelectedOptionGender(null);
    setSearchQuery(""); // Optional: Clear search as well
  };
  useEffect(() => {
    // Replace the fetching logic with dummy data
    const fetchDummyTutors = () => {
      setLoading(true);
      const dummyTutors = [
        {
          id: "1",
          profilePicture: icons.femaletutor, // Dummy image URL
          age: "35-40 years",
          averageRating: 3,
          contact: "81237654",
          description:
            "With years of experience in teaching physics, I focus on breaking down difficult topics like mechanics and electromagnetism. My lessons are designed to enhance analytical thinking and problem-solving skills.",
          experience: "more than 5",
          gender: "Female",
          isFavorite: true,
          name: "Clara Teo",
          ratePerHour: "50",
          subject: "Physics",
        },
        {
          id: "2",
          profilePicture: icons.maletutor, // Dummy image URL
          age: "above 40 years",
          averageRating: 5,
          contact: "83749672",
          description:
            "With over 20 years of experience, I guide students through various historical and political topics. My aim is to foster a deep understanding of the world and how social systems function.",
          experience: "more than 5",
          gender: "Male",
          isFavorite: true,
          name: "Richard Low",
          ratePerHour: "70",
          subject: "Social Studies",
        },
        // Add more dummy tutors as needed
      ];

      setCards(dummyTutors);
      setLoading(false);
    };

    fetchDummyTutors();
  }, []);

  const filteredTutor = cards.filter((tutor) => {
    const matchesSearchQuery =
      tutor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tutor.subject.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesExperience =
      !selectedOption || tutor.experience === selectedOption;

    const matchesGender =
      !selectedOptionGender || tutor.gender === selectedOptionGender;

    return matchesSearchQuery && matchesExperience && matchesGender;
  });

  const toggleFavorite = (id) => {
    const updatedCards = cards.map((card) =>
      card.id === id ? { ...card, isFavorite: !card.isFavorite } : card
    );
    setCards(updatedCards);
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

      {/* filter */}
      <View
        style={{
          flexDirection: "row",
          width: "90%",
          marginBottom: RFPercentage(1),
          alignItems: "center",
        }}
      >
        <View style={{ width: "38%" }}>
          <CustomPicker
            options={["1-3 year", "3-5 year", "more than 5"]}
            selectedItem={selectedOption}
            onSelect={handleSelectOption}
            title="Experience"
          />
        </View>
        <View style={{ width: "38%", marginLeft: RFPercentage(1) }}>
          <CustomPicker
            options={["Male", "Female", "Prefer not Say"]}
            selectedItem={selectedOptionGender}
            onSelect={handleSelectOptionGender}
            title="Gender"
          />
        </View>
        <TouchableOpacity style={styles.clearButton} onPress={clearFilters}>
          <Text style={styles.clearButtonText}>Clear</Text>
        </TouchableOpacity>
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
          Saved Tutor Profiles
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
        {loading ? (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <ActivityIndicator size="large" color={Colors.primary} />
          </View>
        ) : filteredTutor.filter((item) => item.isFavorite).length === 0 ? (
          <Text style={{ marginTop: RFPercentage(2), color: Colors.blacky }}>
            No saved tutors.
          </Text>
        ) : (
          filteredTutor
            .filter((item) => item.isFavorite)
            .map((item, i) => (
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                  props.navigation.navigate("TutorDetail", {
                    tutorData: item,
                  });
                }}
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
                      tutorData: item,
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
                      width: RFPercentage(10),
                      height: RFPercentage(12),
                      borderRadius: RFPercentage(1),
                    }}
                    source={item.profilePicture} // Assuming profilePicture is a URL
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
                        fontSize: RFPercentage(2.4),
                      }}
                    >
                      {item.name}
                    </Text>
                    <TouchableOpacity
                      onPress={() => toggleFavorite(item.id)}
                      style={{
                        position: "absolute",
                        right: 0,
                        bottom: RFPercentage(1),
                      }}
                    >
                      <Fontisto
                        name="favorite"
                        color={item.isFavorite ? Colors.primary : Colors.grey}
                        size={35}
                      />
                    </TouchableOpacity>
                  </View>
                  <Text
                    style={{
                      marginTop: RFPercentage(0.5),
                      color: Colors.blacky,
                      fontFamily: FontFamily.regular,
                      fontSize: RFPercentage(2),
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
                        fontSize: RFPercentage(2),
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
                    <HeartRating rating={item.averageRating} />
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
                        {item.averageRating} hearts
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            ))
        )}
      </ScrollView>
    </View>
  );
};

export default SavedScreen;
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
  clearButtonText: {
    color: Colors.white,
    fontFamily: FontFamily.medium,
    fontSize: RFPercentage(1.5),
  },
  clearButton: {
    marginVertical: RFPercentage(1),
    paddingHorizontal: RFPercentage(2),
    paddingVertical: RFPercentage(1),
    backgroundColor: Colors.primary,
    borderRadius: RFPercentage(1),
    marginLeft: RFPercentage(1),
  },
});
