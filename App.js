import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Seat from "./src/components/seat";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function App() {
  const [count, setCount] = useState(0);
  const [seats, setSeats] = useState([]);

  const getSilverSeats = () => {
    let allSeats = [];
    for (let i = 1; i <= 136; i++) {
      allSeats.push({ _id: `s${i}` });
    }
    return allSeats.map((seat) => {
      return (
        <Seat seat={seat} count={count} setSeats={setSeats} seats={seats} />
      );
    });
  };

  const getPlatinumSeats = () => {
    let allSeats = [];
    for (let i = 1; i <= 68; i++) {
      allSeats.push({ _id: `p${i}` });
    }
    return allSeats.map((seat) => {
      return (
        <Seat seat={seat} count={count} setSeats={setSeats} seats={seats} />
      );
    });
  };

  const getReclinerSeats = () => {
    let allSeats = [];
    for (let i = 1; i <= 28; i++) {
      allSeats.push({ _id: `r${i}` });
    }
    return allSeats.map((seat) => {
      return (
        <Seat seat={seat} count={count} setSeats={setSeats} seats={seats} />
      );
    });
  };

  console.log(seats);
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ height: 840 }}>
        <ScrollView
          horizontal={true}
          centerContent={true}
          contentContainerStyle={{
            flexDirection: "column",
            margin: 50,
            width: 700,
            borderWidth: 5,
            height: 800,
          }}
        >
          <Text
            style={{
              fontSize: 16,
              borderBottomWidth: StyleSheet.hairlineWidth,
              color: "#888",
              marginLeft: 5,
            }}
          >
            Rs. 290 RECLINER
          </Text>
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

          <Text
            style={{
              fontSize: 16,
              borderBottomWidth: StyleSheet.hairlineWidth,
              color: "#888",
              marginLeft: 5,
            }}
          >
            Rs. 150 PLATINUM
          </Text>
          <View style={{ width: 600, alignItems: "center", marginTop: 10 }}>
            <View
              style={{ flexDirection: "row", flexWrap: "wrap", width: 500 }}
            >
              {getPlatinumSeats()}
            </View>
          </View>
          <View style={{ height: 50 }} />

          <Text
            style={{
              fontSize: 16,
              color: "#888",
              borderBottomWidth: StyleSheet.hairlineWidth,
              marginLeft: 5,
            }}
          >
            Rs. 90 SILVER
          </Text>
          <View style={{ width: 600, alignItems: "center", marginTop: 10 }}>
            <View
              style={{
                flexDirection: "row",
                width: 500,
                flexWrap: "wrap",
              }}
            >
              {getSilverSeats()}
            </View>
          </View>
          <View style={{ width: 600, alignItems: "center", marginTop: 10 }}>
            <Image
              source={require("./assets/screen.png")}
              resizeMode="contain"
              style={{
                width: 400,
                height: 100,
              }}
            />
            <Text>All eyes this way!</Text>
          </View>
        </ScrollView>
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
            <Text>Selected</Text>
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
});
