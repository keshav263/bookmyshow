import React from "react";
import { StyleSheet, Text, View } from "react-native";
import LottieView from "lottie-react-native";
import Colors from "../constants/Colors";
import { Button } from "react-native-paper";
import { StackActions } from "@react-navigation/native";

const ConfirmationScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <LottieView
        source={require("../../assets/confirmation.json")}
        autoPlay
        loop={false}
        style={{ width: "100%", height: 200 }}
      />
      <Text
        style={{
          fontSize: 22,
          textAlign: "center",
          color: "red",
          fontWeight: "bold",
        }}
      >
        Your tickets has been bought Successfully
      </Text>
      {/* <Text style={{ marginTop: 20, fontSize: 16 }}>
        Just Sit back & Relax.
      </Text> */}
      <Text style={{ fontSize: 16 }}></Text>
      <Text style={{ fontSize: 16, marginBottom: 30 }}>
        Thanks for Using Our Services
      </Text>
      <Button
        mode="contained"
        uppercase={false}
        color="red"
        style={{ width: "80%" }}
        contentStyle={{ padding: 5 }}
        onPress={() => {
          navigation.dispatch(StackActions.popToTop());

          navigation.navigate("Profile", {
            screen: "Bookings",
          });
        }}
      >
        Check ticket details
      </Button>
      <Button
        onPress={() => {
          navigation.dispatch(StackActions.popToTop());
          navigation.navigate("Home");
        }}
        mode="contained"
        color="red"
        uppercase={false}
        style={{ width: "80%", marginTop: 15 }}
        contentStyle={{ padding: 5 }}
      >
        Keep Browsing
      </Button>
    </View>
  );
};

export default ConfirmationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bkg,
    alignItems: "center",
    justifyContent: "center",
  },
});
