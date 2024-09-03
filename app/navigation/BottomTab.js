import React from "react";
import { Image, StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { RFPercentage } from "react-native-responsive-fontsize";
import { Fontisto, Entypo } from "@expo/vector-icons";

//screens
import HomeScreen from "../screens/HomeScreen";
import SavedScreen from "../screens/SavedScreen";

//config
import Colors from "../config/Colors";

const Tab = createBottomTabNavigator();

export default function BottomTab() {
  return (
    <Tab.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: "#7B7B7B",
        headerShown: false,
        tabBarStyle: {
          height: wp("18%"),
          padding: 5,
          paddingBottom: RFPercentage(2),
          alignItems: "center",
          justifyContent: "center",
        },
      }}
    >
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <Entypo name="home" color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name="Profilescreen"
        component={SavedScreen}
        options={{
          tabBarLabel: "Saved",
          tabBarIcon: ({ color, size }) => (
            <Fontisto name="favorite" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  activeIcon: {
    width: RFPercentage(6),
    height: RFPercentage(6),
    backgroundColor: Colors.third,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
});
