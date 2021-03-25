import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import HomeNavigator from "./Flow/HomeNavigator";
import ProfileNavigator from "./Flow/ProfileNavigator";
import {
  AntDesign,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import Colors from "../constants/Colors";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { useSelector } from "react-redux";
import SearchScreen from "../screens/SearchScreen";
import AdminNavigator from "./Flow/AdminNavigator";
import SearchNavigator from "./Flow/SearchNavigator";

const tabOptions = {
  activeTintColor: Colors.tertiary,
  showLabel: false,
  inactiveTintColor: "gray",
  tabStyle: {
    backgroundColor: "#fff",
  },
};

const FlowTabNavigator = createBottomTabNavigator();

const FlowNavigator = () => {
  const type = useSelector((state) => state.Profile.type);
  let isAdmin = false;
  if (type === "admin") {
    isAdmin = true;
  }
  return (
    <FlowTabNavigator.Navigator tabBarOptions={tabOptions}>
      <FlowTabNavigator.Screen
        name="Home"
        component={HomeNavigator}
        options={({ route }) => {
          let tabBarVisible;
          const routeName = getFocusedRouteNameFromRoute(route);

          if (routeName === "Movie" || routeName === "AddSeats" || routeName==="Checkout" || routeName==="Confirm") {
            tabBarVisible = false;
          } else {
            tabBarVisible = true;
          }

          return {
            tabBarVisible,
            tabBarIcon: ({ color }) => (
              <AntDesign name="home" size={30} color={color} />
            ),
          };
        }}
      />
      <FlowTabNavigator.Screen
        name="Search"
        component={SearchNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <AntDesign name="search1" size={30} color={color} />
          ),
        }}
      />

      <FlowTabNavigator.Screen
        name="Profile"
        component={ProfileNavigator}
        options={({ route }) => {
          let tabBarVisible;
          const routeName = getFocusedRouteNameFromRoute(route);

          if (routeName === "Bookings") {
            tabBarVisible = false;
          } else {
            tabBarVisible = true;
          }
          return {
            tabBarVisible,
            tabBarIcon: ({ color }) => (
              <AntDesign name="user" size={30} color={color} />
            ),
          };
        }}
      />
      {isAdmin && (
        <FlowTabNavigator.Screen
          name="Admin"
          component={AdminNavigator}
           options={({ route }) => {
          let tabBarVisible;
          const routeName = getFocusedRouteNameFromRoute(route);

          if (routeName === "AddMovie" || routeName === "AddTiming") {
            tabBarVisible = false;
          } else {
            tabBarVisible = true;
          }

          return {
          tabBarVisible,
           tabBarIcon: ({ color }) => (
              <AntDesign name="plus" size={30} color={color} />
            ),
          };
        }}
         />
      )}
    </FlowTabNavigator.Navigator>
  );
};

export default FlowNavigator;
