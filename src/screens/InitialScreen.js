import React, { useEffect } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import { useDispatch } from "react-redux";
import Colors from "../constants/Colors";
import * as authActions from "../store/actions/Auth";

const InitialScreen = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const token = await AsyncStorage.getItem("tokenId");
      if (token) {
        try {
          await dispatch(authActions.autoLogIn(token));
        } catch (error) {
          dispatch(authActions.setDidTryAutoLogin());
        }
      } else {
        dispatch(authActions.setDidTryAutoLogin());
      }
    };
    fetchData();
  }, [dispatch]);

  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
        backgroundColor: Colors.bkg,
      }}
    >
      <ActivityIndicator size="large" color={Colors.tertiary} />
      <Text style={{ fontSize: 20, marginVertical: 15, fontStyle: "italic" }}>
        Getting credentials...
      </Text>
    </View>
  );
};

export default InitialScreen;
