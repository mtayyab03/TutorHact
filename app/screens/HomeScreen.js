import React, { useState, useEffect } from "react";
import {
  Image,
  TouchableOpacity,
  TextInput,
  View,
  Text,
  StyleSheet,
  ScrollView,
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

const HomeScreen = (props) => {
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

  useEffect(() => {
    // Dummy tutor data with reviews and ratings
    const dummyTutorData = [
      {
        id: "1",
        profilePicture: icons.maletutor,
        age: "26-35 years",
        averageRating: 5,
        contact: "81234567",
        description:
          "As a chemistry tutor, I simplify complex chemical concepts and reactions to make them easy to understand. My lessons are designed to engage students, helping them connect theory to real-world applications.",
        experience: "3-5 year",
        gender: "Male",
        isFavorite: false,
        name: "David Wong",
        ratePerHour: "40",
        subject: "Chemistry",
      },
      {
        id: "2",
        profilePicture: icons.femaletutor, // Dummy image URL
        age: "18-25 years",
        averageRating: 5,
        contact: "83394567",
        description:
          "I focus on strengthening students' foundations in biology, helping them develop a clear understanding of key concepts. My goal is to build their confidence and prepare them for exams.",
        experience: "1-3 year",
        gender: "Female",
        isFavorite: false,
        name: "Sara Lim",
        ratePerHour: "30",
        subject: "Biology",
      },
      {
        id: "3",
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
        id: "4",
        profilePicture: icons.maletutor, // Dummy image URL
        age: "26-35 years",
        averageRating: 5,
        contact: "83456789",
        description:
          "As an English tutor, I emphasize building strong reading and writing skills. I help students improve their grammar, vocabulary, and essay-writing techniques to excel in their exams.",
        experience: "3-5 year",
        gender: "Male",
        isFavorite: false,
        name: "Kishore Rathi",
        ratePerHour: "45",
        subject: "English",
      },
      {
        id: "5",
        profilePicture: icons.femaletutor, // Dummy image URL
        age: "above 40 years",
        averageRating: 5,
        contact: "83920348",
        description:
          "With over 20 years of experience in social studies, I help students understand historical events, geography, and political systems. I use real-world examples to make learning engaging and relevant.",
        experience: "more than 5",
        gender: "Female",
        isFavorite: false,
        name: "Janet Ng",
        ratePerHour: "60",
        subject: "Social Studies",
      },
      {
        id: "6",
        profilePicture: icons.maletutor, // Dummy image URL
        age: "18-25 years",
        averageRating: 4,
        contact: "83750312",
        description:
          "I use a hands-on approach to help students grasp difficult chemistry concepts like organic reactions and stoichiometry. My goal is to make chemistry more approachable and interesting.",
        experience: "1-3 year",
        gender: "Male",
        isFavorite: false,
        name: "John Tan",
        ratePerHour: "35",
        subject: "Chemistry",
      },
      {
        id: "7",
        profilePicture: icons.femaletutor, // Dummy image URL
        age: "26-35 years",
        averageRating: 4,
        contact: "83674512",
        description:
          "I focus on improving students' understanding of biological processes, from cell structure to genetics. My goal is to make biology engaging and help students see its real-life applications.",
        experience: "3-5 year",
        gender: "Female",
        isFavorite: false,
        name: "Aisha Khan",
        ratePerHour: "50",
        subject: "Biology",
      },
      {
        id: "8",
        profilePicture: icons.maletutor, // Dummy image URL
        age: "35-40 years",
        averageRating: 0,
        contact: "82345678",
        description:
          "I help students break down tough physics concepts like thermodynamics and optics. My teaching approach emphasizes critical thinking and practical problem-solving techniques.",
        experience: "more than 5",
        gender: "Male",
        isFavorite: false,
        name: "Alex Cheong",
        ratePerHour: "55",
        subject: "Physics",
      },
      {
        id: "9",
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
      {
        id: "10",
        profilePicture: icons.femaletutor, // Dummy image URL
        age: "18-25 years",
        averageRating: 3,
        contact: "83650742",
        description:
          "I work closely with students to improve their English language skills, from reading comprehension to essay writing. My lessons are focused on helping students build strong communication abilities.",
        experience: "1-3 year",
        gender: "Female",
        isFavorite: false,
        name: "Emily Chen",
        ratePerHour: "35",
        subject: "English",
      },
      {
        id: "11",
        profilePicture: icons.maletutor, // Dummy image URL
        age: "26-35 years",
        averageRating: 1,
        contact: "83850674",
        description:
          "I use real-world examples to make biology engaging and relatable for students. From cellular biology to ecology, I ensure that my students build a solid foundation for their exams.",
        experience: "3-5 year",
        gender: "Male",
        isFavorite: false,
        name: "Ben Leong",
        ratePerHour: "45",
        subject: "Biology",
      },
      {
        id: "12",
        profilePicture: icons.femaletutor, // Dummy image URL
        age: "35-40 years",
        averageRating: 0,
        contact: "83490672",
        description:
          "As a seasoned English tutor, I help students improve their writing, reading, and critical thinking skills. My lessons are designed to challenge students and push them towards academic success.",
        experience: "more than 5",
        gender: "Female",
        isFavorite: false,
        name: "Rachel Ong",
        ratePerHour: "55",
        subject: "English",
      },
      {
        id: "13",
        profilePicture: icons.femaletutor, // Dummy image URL
        age: "18-25 years",
        averageRating: 3,
        contact: "83749516",
        description:
          "I focus on making physics less intimidating by simplifying difficult topics like waves and electricity. My aim is to make learning physics enjoyable while preparing students for exams.",
        experience: "1-3 year",
        gender: "Male",
        isFavorite: false,
        name: "Zack Lim",
        ratePerHour: "30",
        subject: "Physics",
      },
      {
        id: "14",
        profilePicture: icons.femaletutor, // Dummy image URL
        age: "26-35 years",
        averageRating: 5,
        contact: "83859501",
        description:
          "As a social studies tutor, I help students grasp the complexities of human societies, historical events, and cultural developments. My lessons focus on critical thinking and connecting ideas across disciplines.",
        experience: "3-5 year",
        gender: "Prefer not Say",
        isFavorite: false,
        name: "Lee Wei",
        ratePerHour: "40",
        subject: "Social Studies",
      },
      {
        id: "15",
        profilePicture: icons.femaletutor, // Dummy image URL
        age: "above 40 years",
        averageRating: 4,
        contact: "83124596",
        description:
          "With decades of experience in teaching chemistry, I focus on guiding students through advanced topics like chemical kinetics and thermodynamics. My lessons are designed to foster a deep understanding of chemistry.",
        experience: "more than 5",
        gender: "Female",
        isFavorite: false,
        name: "Monica Chua",
        ratePerHour: "65",
        subject: "Chemistry",
      },
    ];

    setCards(dummyTutorData);
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

  // Toggle favorite function
  const toggleFavorite = (id) => {
    const updatedCards = cards.map((card) =>
      card.id === id ? { ...card, isFavorite: !card.isFavorite } : card
    );
    setCards(updatedCards);
  };

  const clearFilters = () => {
    setSelectedOption(null);
    setSelectedOptionGender(null);
    setSearchQuery(""); // Optional: Clear search as well
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

      {/* filters */}
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
    marginTop: RFPercentage(1.5),
    marginBottom: RFPercentage(0.5),
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
