import React, { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Seat from "../components/seat";
import { Button } from "react-native-paper";
import { useSelector, useDispatch } from "react-redux";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import fonts from "../constants/fonts";
import * as bookingActions from "../store/actions/Bookings";

export default function AddSeatsScreen({ route, navigation }) {
  const [count, setCount] = useState(0);
  const [seats, setSeats] = useState([]);
  const [price, setPrice] = useState(0);
  const [isLoading, setisLoading] = useState(false);
  const { movie_id, time } = route.params;
  const dispatch = useDispatch();
  const token = useSelector((state) => state.Auth.token);

  useEffect(() => {
    let newPrice = 0;
    seats.map((seat) => {
      if (seat._id[0] === "L" || seat._id[0] === "K") {
        newPrice += 200;
      } else if (
        seat._id === "G" ||
        seat._id[0] === "H" ||
        seat._id[0] === "I" ||
        seat._id[0] === "J"
      ) {
        newPrice += 150;
      } else {
        newPrice += 90;
      }
    });
    setPrice(newPrice);
  });

  const getSilverSeats = () => {
    let allSeats = [];
    let letter = "F";

    for (let i = 0; i < 6; i++) {
      // console.log(letter);
      for (let j = 1; j <= 20; j++) {
        allSeats.push({ _id: `${letter}${j}` });
      }
      letter = String.fromCharCode(letter.charCodeAt(0) - 1);
    }
    return allSeats.map((seat) => {
      return (
        <Seat
          key={seat._id}
          seat={seat._id}
          count={count}
          setSeats={setSeats}
          seats={seats}
        />
      );
    });
  };

  const getPlatinumSeats = () => {
    let allSeats = [];

    let letter = "J";

    for (let i = 0; i < 4; i++) {
      // console.log(letter);
      for (let j = 1; j <= 20; j++) {
        allSeats.push({ _id: `${letter}${j}` });
      }
      letter = String.fromCharCode(letter.charCodeAt(0) - 1);
    }
    return allSeats.map((seat) => {
      return (
        <Seat
          key={seat._id}
          seat={seat._id}
          count={count}
          setSeats={setSeats}
          seats={seats}
        />
      );
    });
  };

  const getReclinerSeats = () => {
    let allSeats = [];
    let letter = "L";

    for (let i = 0; i < 2; i++) {
      // console.log(letter);
      for (let j = 1; j <= 16; j++) {
        allSeats.push({ _id: `${letter}${j}` });
      }
      letter = String.fromCharCode(letter.charCodeAt(0) - 1);
    }
    return allSeats.map((seat) => {
      return (
        <Seat
          key={seat._id}
          seat={seat._id}
          count={count}
          setSeats={setSeats}
          seats={seats}
        />
      );
    });
  };

  console.log(seats);
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ height: 700 }}>
        <Text
          style={{
            color: "black",
            fontFamily: fonts.Bold,
            fontSize: 25,
            margin: 10,
          }}
        >
          Time:{time}hrs
        </Text>
        <ScrollView
          horizontal={true}
          centerContent={true}
          contentContainerStyle={{
            flexDirection: "column",

            width: 720,
            borderWidth: 5,
            height: 800,
          }}
        >
          <View
            style={{
              position: "absolute",
              backgroundColor: "#888",
              borderRadius: 20,
              marginTop: 35,
            }}
          >
            <Text style={styles.seatLetterSize}>L</Text>
            <Text style={styles.seatLetterSize}>K</Text>
            <Text style={[{ marginTop: 60 }, styles.seatLetterSize]}>J</Text>
            <Text style={styles.seatLetterSize}>I</Text>
            <Text style={styles.seatLetterSize}>H</Text>
            <Text style={styles.seatLetterSize}>G</Text>
            <Text style={[{ marginTop: 50 }, styles.seatLetterSize]}>F</Text>
            {/* <Text style={styles.seatLetterSize}>G</Text> */}
            {/* <Text style={styles.seatLetterSize}>F</Text> */}
            <Text style={styles.seatLetterSize}>E</Text>
            <Text style={styles.seatLetterSize}>D</Text>
            <Text style={styles.seatLetterSize}>C</Text>
            <Text style={styles.seatLetterSize}>B</Text>
            <Text style={styles.seatLetterSize}>A</Text>
          </View>
          <View
            style={{
              position: "absolute",
              backgroundColor: "#888",
              borderRadius: 20,
              marginTop: 35,
              right: 0,
            }}
          >
            <Text style={styles.seatLetterSize}>L</Text>
            <Text style={styles.seatLetterSize}>K</Text>
            <Text style={[{ marginTop: 60 }, styles.seatLetterSize]}>J</Text>
            <Text style={styles.seatLetterSize}>I</Text>
            <Text style={styles.seatLetterSize}>H</Text>
            <Text style={styles.seatLetterSize}>G</Text>
            <Text style={[{ marginTop: 50 }, styles.seatLetterSize]}>F</Text>
            {/* <Text style={styles.seatLetterSize}>G</Text> */}
            {/* <Text style={styles.seatLetterSize}>F</Text> */}
            <Text style={styles.seatLetterSize}>E</Text>
            <Text style={styles.seatLetterSize}>D</Text>
            <Text style={styles.seatLetterSize}>C</Text>
            <Text style={styles.seatLetterSize}>B</Text>
            <Text style={styles.seatLetterSize}>A</Text>
          </View>
          <View style={{ marginHorizontal: 50, marginVertical: 10 }}>
            <Text style={styles.class}>Rs. 290 RECLINER</Text>
            <View style={{ width: 600, alignItems: "center", marginTop: 10 }}>
              <View
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                  width: 400,
                  alignItems: "center",
                  // borderWidth: 5,
                  alignSelf: "center",
                }}
              >
                {getReclinerSeats()}
              </View>
            </View>
            <View style={{ height: 50 }} />

            <Text style={styles.class}>Rs. 150 PLATINUM</Text>
            <View style={{ width: 600, alignItems: "center", marginTop: 10 }}>
              <View
                style={{ flexDirection: "row", flexWrap: "wrap", width: 500 }}
              >
                {getPlatinumSeats()}
              </View>
            </View>
            <View style={{ height: 50 }} />

            <Text style={styles.class}>Rs. 90 SILVER</Text>
            <View style={{ width: 600, alignItems: "center", marginTop: 10 }}>
              <View
                style={{ flexDirection: "row", flexWrap: "wrap", width: 500 }}
              >
                {getSilverSeats()}
              </View>
            </View>
            <View style={{ width: 600, alignItems: "center" }}>
              <Image
                source={require("../../assets/screen.png")}
                resizeMode="contain"
                style={{
                  width: 400,
                  height: 80,
                }}
              />
              <Text style={{ position: "relative", top: -15 }}>
                All eyes this way!
              </Text>
            </View>
          </View>
        </ScrollView>
        {seats.length > 0 && (
          <View
            style={{
              position: "absolute",
              bottom: 40,

              width: "100%",
              backgroundColor: "#f3f5f7",
            }}
          >
            <Button
              mode="contained"
              color="red"
              style={{ margin: 15 }}
              loading={isLoading}
              disabled={isLoading}
              onPress={async () => {
                setisLoading(true);
                let arrayOfSeats = seats.map((seat) => {
                  return seat._id;
                });
                await dispatch(
                  bookingActions.bookSeats(arrayOfSeats, time, movie_id, token)
                );
                setisLoading(false);
                navigation.navigate("Confirm");
              }}
            >
              Pay Rs.{price}
            </Button>
          </View>
        )}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
            position: "absolute",
            bottom: 0,
            width: "100%",
            backgroundColor: "#f3f5f7",
            padding: 10,
          }}
        >
          <View style={{ alignItems: "center", flexDirection: "row" }}>
            <MaterialCommunityIcons
              style={{ margin: 3 }}
              name={"seat-outline"}
              size={24}
              color={"#888"}
            />
            <Text>Available</Text>
          </View>
          <View style={{ alignItems: "center", flexDirection: "row" }}>
            <MaterialCommunityIcons
              style={{ margin: 3 }}
              name={"seat"}
              size={24}
              color={"black"}
            />
            <Text>Unavailable</Text>
          </View>
          <View style={{ alignItems: "center", flexDirection: "row" }}>
            <MaterialCommunityIcons
              style={{ margin: 3 }}
              name={"seat"}
              size={24}
              color={"#10E329"}
            />
            <Text>Selected</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "#fff",
    // alignItems: "center",
    // justifyContent: "center",
  },
  seatLetterSize: {
    fontSize: 20,
    color: "white",
    paddingHorizontal: 5,
    fontFamily: fonts.Light,
  },
  class: {
    fontSize: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    color: "#888",
    marginLeft: 5,
  },
});
