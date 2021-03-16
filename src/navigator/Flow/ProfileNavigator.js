import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ProfileScreen from "../../screens/ProfileScreen";
import BookingsScreen from "../../screens/BookingsScreen";
const ProfileStackNavigator = createStackNavigator();

const ProfileNavigator = () => {
  return (
    <ProfileStackNavigator.Navigator>
      <ProfileStackNavigator.Screen name="Profile" component={ProfileScreen} />
      <ProfileStackNavigator.Screen
        name="Bookings"
        component={BookingsScreen}
      />
    </ProfileStackNavigator.Navigator>
  );
};

export default ProfileNavigator;
