import React, { useState, useEffect } from "react";
import {
  Image,
  TouchableOpacity,
  TextInput,
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import { Feather, Fontisto } from "@expo/vector-icons";
import {
  collection,
  getDocs,
  updateDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../firebase"; // Firebase config

// componenets
import HeartRating from "../components/HeartRating";
import Header from "../components/Header";

//config
import Colors from "../config/Colors";
import { FontFamily } from "../config/font";

const HomeScreen = (props) => {
  const [cards, setCards] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  useEffect(() => {
    // Function to fetch tutors and reviews
    const fetchTutorsAndReviews = () => {
      const unsubscribe = onSnapshot(
        collection(db, "tutors"),
        async (snapshot) => {
          try {
            const tutorData = snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));

            const updatedTutorData = await Promise.all(
              tutorData.map(async (tutor) => {
                const reviewsCollection = collection(
                  db,
                  "tutors",
                  tutor.id,
                  "reviews"
                );
                const reviewsSnapshot = await getDocs(reviewsCollection);
                const reviews = reviewsSnapshot.docs.map((doc) => doc.data());

                const totalRating = reviews.reduce(
                  (sum, review) => sum + review.rating,
                  0
                );
                const averageRating =
                  reviews.length > 0
                    ? Math.round(totalRating / reviews.length)
                    : 0;

                return {
                  ...tutor,
                  averageRating,
                  isFavorite: tutor.isFavorite || false,
                };
              })
            );

            setCards(updatedTutorData);
          } catch (error) {
            Alert.alert("Error", "Failed to load data from Firestore.");
            console.log("Firestore error: ", error);
          }
        }
      );

      // Cleanup function to unsubscribe from the listener
      return () => unsubscribe();
    };

    fetchTutorsAndReviews();
  }, []);

  const filteredTutor = cards.filter(
    (tutor) =>
      tutor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tutor.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Toggle favorite function
  const toggleFavorite = async (id) => {
    try {
      // Toggle favorite status locally
      const updatedCards = cards.map((card) =>
        card.id === id ? { ...card, isFavorite: !card.isFavorite } : card
      );
      setCards(updatedCards);

      // Log to check the updated status locally
      console.log("Updated cards: ", updatedCards);

      // Get the document reference
      const tutorRef = doc(db, "tutors", id);

      // Update the favorite status in Firestore
      await updateDoc(tutorRef, {
        isFavorite: updatedCards.find((card) => card.id === id).isFavorite,
      });

      console.log(
        `Updated favorite status for tutor ${id}: ${!updatedCards.find(
          (card) => card.id === id
        ).isFavorite}`
      );
    } catch (error) {
      console.error("Error updating favorite status: ", error);
    }
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
                  width: RFPercentage(9),
                  height: RFPercentage(9),
                  borderRadius: RFPercentage(1),
                }}
                source={{ uri: item.profilePicture }} // Assuming profilePicture is a URL
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
                  fontSize: RFPercentage(1.4),
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
                    fontSize: RFPercentage(1.4),
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
