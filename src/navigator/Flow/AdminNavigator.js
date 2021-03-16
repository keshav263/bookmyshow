import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AdminScreen from "../../screens/AdminScreen";
import AddMovieScreen from "../../screens/AddMovieScreen";
import AddTimingScreen from "../../screens/AddTimingScreen";
const AdminStackNavigator = createStackNavigator();

const AdminNavigator = () => {
  return (
    <AdminStackNavigator.Navigator screenOptions={{ headerTitle: "Admin" }}>
      <AdminStackNavigator.Screen name="Admin" component={AdminScreen} />
      <AdminStackNavigator.Screen name="AddMovie" component={AddMovieScreen} />
      <AdminStackNavigator.Screen
        name="AddTiming"
        component={AddTimingScreen}
      />
    </AdminStackNavigator.Navigator>
  );
};

export default AdminNavigator;
