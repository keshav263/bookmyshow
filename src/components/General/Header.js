import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Colors from "../../constants/Colors";
import Dash from "react-native-dash";
import fonts from "../../constants/fonts";
import { useNavigation } from "@react-navigation/native";
import BackButton from "./BackButton";

const Header = (props) => {
  const navigation = useNavigation();
  return (
    <>
      <View
        style={{
          alignItems: "center",
          backgroundColor: "#fff",
          width: "100%",
          height: 60,
          justifyContent: "center",
          flexDirection: "row",
        }}
      >
        <TouchableOpacity
          style={{
            marginHorizontal: 15,
            position: "absolute",
            left: "2%",
          }}
          onPress={() => {
            if (props.checkOut) {
              navigation.navigate("Cart");
              return;
            }
            if (props.navigateTo) {
              navigation.navigate(props.navigateTo);
              return;
            }
            navigation.goBack();
          }}
        >
          <BackButton />
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 20,
            alignSelf: "center",
            // textTransform: "uppercase",
            color: Colors.primary,
            fontFamily: fonts.Bold,
          }}
        >
          {props.text}
        </Text>
      </View>
      <Dash
        style={{
          width: "100%",
          height: 3,
          opacity: 10,
        }}
        dashColor="#fff"
        dashThickness={10}
        dashLength={10}
        dashStyle={{ borderRadius: 100, overflow: "hidden" }}
      />
    </>
  );
};

export default Header;
