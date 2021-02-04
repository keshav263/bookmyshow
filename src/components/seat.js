import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Seat = ({ seat, addSeat, count, setSeats, seats }) => {
  const [isSelected, setIsSelected] = useState(false);
  return (
    <TouchableOpacity
      key={seat._id}
      onPress={() => {
        if (!isSelected) {
          setIsSelected(true);
          setSeats((x) => [...x, { _id: seat._id }]);
        } else {
          setIsSelected(false);
          let x = seats.filter((s) => s._id !== seat._id);
          setSeats(x);
        }
      }}
    >
      <MaterialCommunityIcons
        style={{ margin: 1 }}
        key={seat._id}
        name={isSelected ? "seat" : "seat-outline"}
        size={26}
        color={isSelected ? "#10E329" : "#888"}
      />
    </TouchableOpacity>
  );
};

export default Seat;

const styles = StyleSheet.create({});
