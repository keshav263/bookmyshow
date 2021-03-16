import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Seat = ({ seat, addSeat, count, setSeats, seats }) => {
  const [isSelected, setIsSelected] = useState(false);
  return (
    <TouchableOpacity
      key={seat}
      onPress={() => {
        if (!isSelected) {
          setIsSelected(true);
          setSeats((x) => [...x, { _id: seat }]);
        } else {
          setIsSelected(false);
          let x = seats.filter((s) => s._id !== seat);
          setSeats(x);
        }
      }}
    >
      <MaterialCommunityIcons
        style={{ margin: 1 }}
        key={seat}
        name={isSelected ? "seat" : "seat-outline"}
        size={22}
        color={isSelected ? "#10E329" : "#888"}
      />
    </TouchableOpacity>
  );
};

export default Seat;

const styles = StyleSheet.create({});
