import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { View } from "react-native";

const BackButton = (props) => {
  return (
    <View {...props}>
      <Ionicons name="chevron-back" size={28} color="#888" />
    </View>
  );
};

export default BackButton;
