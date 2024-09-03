import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Screens
import SplashScreen from "../screens/SplashScreen";
import TutorDetail from "../screens/TutorDetail";
import TutorSignUp from "../screens/TutorSignUp";

import BottomTab from "./BottomTab";

const Stack = createNativeStackNavigator();

export default function NavigationStack() {
  // const token = useSelector((state) => state.auth.token); // Get token from Redux store

  return (
    <Stack.Navigator
      screenOptions={{ headerMode: "false" }}
      initialRouteName={"SplashScreen"}
    >
      {/* login */}
      <Stack.Screen
        options={{ headerShown: false }}
        name="SplashScreen"
        component={SplashScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="TutorDetail"
        component={TutorDetail}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="TutorSignUp"
        component={TutorSignUp}
      />

      <Stack.Screen
        options={{ headerShown: false }}
        name="BottomTab"
        component={BottomTab}
      />
    </Stack.Navigator>
  );
}
