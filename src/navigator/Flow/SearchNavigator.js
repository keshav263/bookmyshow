import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SearchScreen from "../../screens/SearchScreen";
const SearchStackNavigator = createStackNavigator();

const SearchNavigator = () => {
  return (
    <SearchStackNavigator.Navigator>
      <SearchStackNavigator.Screen name="Search" component={SearchScreen} />
    </SearchStackNavigator.Navigator>
  );
};

export default SearchNavigator;
