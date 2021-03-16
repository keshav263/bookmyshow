import React from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons, Entypo } from "@expo/vector-icons";
import fonts from "../../constants/fonts";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import * as authActions from "../../store/actions/Auth";

const Options = ({
  title,
  color,
  iconName,
  navigateTo,
  logOut,
  headerTitle,
}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  return (
    <TouchableOpacity
      onPress={() => {
        if (navigateTo === "Bookings") {
          navigation.navigate("Bookings");
        }
        if (logOut) {
          Alert.alert("Are you sure you want to log out?", "", [
            {
              text: "Yes",
              onPress: () => {
                dispatch(authActions.log_out());
              },
            },
            {
              text: "No",
            },
          ]);
        }
      }}
      style={{
        flexDirection: "row",
        alignItems: "center",
        margin: 10,
        borderBottomWidth: StyleSheet.hairlineWidth,
        paddingBottom: 10,
      }}
    >
      <Ionicons
        name={iconName}
        size={24}
        color="white"
        style={{
          backgroundColor: color,
          padding: 8,
          borderRadius: 10,
          marginRight: 15,
        }}
      />
      <Text style={{ fontFamily: fonts.Regular, fontSize: 18 }}>{title}</Text>
      <Entypo
        name="chevron-right"
        size={24}
        color="#888"
        style={{
          position: "absolute",
          right: 0,
        }}
      />
    </TouchableOpacity>
  );
};

export default Options;

const styles = StyleSheet.create({});
