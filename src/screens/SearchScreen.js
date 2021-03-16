import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Searchbar } from "react-native-paper";

const SearchScreen = () => {
  return (
    <View style={{ flex: 1, margin: 20 }}>
      <Searchbar style={{ margin: 10 }} placeholder="Search" />
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({});
