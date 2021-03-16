import React, { useEffect, useState } from "react";
import { ActivityIndicator, Image, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import * as bookingActions from "../store/actions/Bookings";
import { Entypo } from "@expo/vector-icons";
import fonts from "../constants/fonts";

const BookingsScreen = () => {
  const dispatch = useDispatch();
  const [isLoading, setisLoading] = useState(false);
  const token = useSelector((state) => state.Auth.token);
  //   console.log(bookingDetails);
  useEffect(() => {
    const fetchData = async () => {
      setisLoading(true);
      await dispatch(bookingActions.getCurrentBooking(token));
      setisLoading(false);
    };
    fetchData();
  }, []);

  const bookingDetails = useSelector((state) => state.Bookings);
  let language;
  let genre;
  if (bookingDetails.movie_details.language) {
    language = JSON.parse(bookingDetails.movie_details.language);
    genre = JSON.parse(bookingDetails.movie_details.movie_genre);
  }

  if (isLoading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size="large" color="red" />
      </View>
    );
  }
  return (
    <View style={{ flex: 1, alignItems: "center", padding: 20 }}>
      <Text
        style={{
          textTransform: "uppercase",
          color: "#888",
          alignSelf: "flex-end",
          fontSize: 20,
        }}
      >
        Booking Id:{bookingDetails.booking_id}
      </Text>
      <Entypo
        name="ticket"
        size={100}
        color="black"
        style={{ marginVertical: 15 }}
      />
      <Text style={{ fontSize: 28, margin: 20, fontFamily: fonts.Bold }}>
        {bookingDetails.seats.join(",")}
      </Text>
      <Text style={{ fontSize: 24, color: "#888", fontFamily: fonts.Light }}>
        {bookingDetails.time} hrs
      </Text>
      <View style={{ alignSelf: "flex-start" }}>
        <Text
          style={{
            fontSize: 26,
            marginVertical: 10,
            fontFamily: fonts.Regular,
          }}
        >
          {bookingDetails.movie_details.movie_name}
        </Text>
        <Text
          style={{
            fontSize: 20,
            fontStyle: "italic",
            marginVertical: 10,
            fontFamily: fonts.Light,
          }}
        >
          {bookingDetails.movie_details.duration} mins{" "}
        </Text>
        {language && (
          <Text style={{ fontSize: 20, fontFamily: fonts.Light }}>
            {language[0]}{" "}
          </Text>
        )}
        {genre && (
          <Text
            style={{
              fontSize: 20,
              marginVertical: 10,
              fontFamily: fonts.Light,
            }}
          >
            {genre.join(",")}{" "}
          </Text>
        )}
        <Text style={{ fontSize: 18, fontFamily: fonts.Light }}>
          {bookingDetails.movie_details.description}
        </Text>
      </View>
    </View>
  );
};

export default BookingsScreen;

const styles = StyleSheet.create({});
