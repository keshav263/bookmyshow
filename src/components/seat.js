import React, { useState,useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Seat = ({ seat_id,setSeats, seats,bookedSeats }) => {
  const [isSelected, setIsSelected] = useState(false);
  const [isBooked,setIsBooked]=useState(false)

  useEffect(()=>{
    let x=seats.findIndex((seat)=>{
      
      return seat._id===seat_id
    })

    if(x!==-1){
      
      setIsSelected(true)
    }

    let z=bookedSeats.findIndex((seat)=>{
      return seat_id === seat
    })

    if(z!==-1){
      setIsBooked(true)
    }

  },[])

  return (
    <TouchableOpacity
      key={seat_id}
      onPress={() => {
        if(!isBooked){

          if (!isSelected) {
            setIsSelected(true);
            setSeats((x) => [...x, { _id: seat_id }]);
          } else {
            setIsSelected(false);
            let x = seats.filter((s) => s._id !== seat_id);
            setSeats(x);
          }
        }
      }}
     
          
    
    >
      <MaterialCommunityIcons
        style={{ margin: 1 }}
        
        name={ isBooked?"checkbox-blank": isSelected ? "checkbox-blank" : "checkbox-blank-outline"}
        size={45}
      color={isBooked?"#454B6B":isSelected ? "#536EE4" : "#536EE4"}
      />
    </TouchableOpacity>
  );
};

export default Seat;

const styles = StyleSheet.create({});
