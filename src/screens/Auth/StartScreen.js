import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  Dimensions,
  ImageBackground,
  ToastAndroid,
} from "react-native";
import { ActivityIndicator, Button } from "react-native-paper";

import Colors from "../../constants/Colors";
import * as authActions from "../../store/actions/Auth";
import { MaterialIcons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { Controller, useForm } from "react-hook-form";

const SCREEN_HEIGHT = Dimensions.get("window").height;
const StartScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { control, errors, handleSubmit } = useForm();
  const dispatch = useDispatch();

  const showInvalidInputToast = () => {
    ToastAndroid.showWithGravityAndOffset(
      "Please enter a valid phone number",
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50
    );
  };

  const onSubmit = async ({ phoneNumber }) => {
    try {
      setIsLoading(true);
      await dispatch(authActions.signInUsingPhoneNumber(phoneNumber));
      setIsLoading(false);
      navigation.navigate("OTPPhoneNumber", {
        phoneNumber: phoneNumber,
      });
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      return Alert.alert("Something went wrong");
    }
  };

  useEffect(() => {
    errors.phoneNumber ? showInvalidInputToast() : null;
  }, [errors]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    // <ImageBackground
    // resizeMode="cover"
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      {/* // source={require("../../../assets/AuthBackground.jpg")}
      // > */}

      <View style={styles.container}>
        <View style={{ height: "15%" }} />
        <View style={{ alignItems: "center" }}>
          <Text style={{ fontSize: 50, marginBottom: 15, fontFamily: "logo" }}>
            bookmyshow
          </Text>
        </View>
        <View style={styles.inputContainerStyle}>
          <Image
            style={styles.flagStyle}
            source={require("../../../assets/flag.jpg")}
          />
          <Text style={styles.prefixStyle}>+91 |</Text>

          <Controller
            control={control}
            render={({ onChange, onBlur, value }) => (
              <TextInput
                placeholder="Phone Number"
                place
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                keyboardType="phone-pad"
                value={value}
                textContentType="telephoneNumber"
                style={styles.inputStyle}
              />
            )}
            name="phoneNumber"
            rules={{
              required: true,
              minLength: 10,
              maxLength: 10,
              pattern: /^\d+$/,
            }}
            defaultValue=""
          />
        </View>

        <Button
          mode="contained"
          color="black"
          onPress={handleSubmit(onSubmit)}
          contentStyle={{ justifyContent: "center", paddingVertical: 7 }}
          style={{
            borderRadius: 10,
            width: "90%",
            alignSelf: "center",
            marginVertical: 20,
          }}
        >
          <Text style={{ fontSize: 17 }}> Send OTP</Text>
        </Button>

        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View style={{ flex: 1, height: 1, backgroundColor: "#888" }} />
          <View>
            <Text style={{ width: 30, textAlign: "center", color: "#888" }}>
              OR
            </Text>
          </View>
          <View style={{ flex: 1, height: 1, backgroundColor: "#888" }} />
        </View>
        <View style={{ marginVertical: 10 }} />
        <TouchableOpacity
          onPress={() => navigation.navigate("SignUp")}
          style={styles.emailContainerStyle}
        >
          <MaterialIcons name="email" size={28} color="black" />
          <Text style={styles.emailTextStyle}> Continue with Email</Text>
        </TouchableOpacity>

        <View
          style={{
            marginHorizontal: 20,
            marginVertical: 20,
          }}
        >
          <Text style={{ textAlign: "center", fontStyle: "italic" }}>
            By signing up,you accept the{" "}
            <Text style={styles.servicesAndPrivacyTextStyle}>
              Terms of Service
            </Text>
            {"  "}and{" "}
            <Text style={styles.servicesAndPrivacyTextStyle}>
              Privacy Policy
            </Text>
          </Text>
        </View>
      </View>
      {/* </ImageBackground>
       */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "70%",
    width: "90%",
    borderRadius: 20,
    justifyContent: "flex-end",
    backgroundColor: "transparent",
  },
  oAuthComponentContainerStyle: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "center",

    alignItems: "center",
  },
  inputContainerStyle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    borderWidth: 1,
    width: "90%",
    height: SCREEN_HEIGHT / 13,
    alignSelf: "center",
    borderRadius: 10,
    backgroundColor: "#fff",
  },
  flagStyle: {
    width: 25,
    height: 18,
    borderRadius: 5,
    overflow: "hidden",
    marginLeft: 15,
  },
  prefixStyle: {
    paddingLeft: 5,
    paddingRight: 5,
    fontSize: 18,
    fontWeight: "bold",
  },
  inputStyle: {
    width: "60%",
    height: 60,
    fontSize: 18,
    fontWeight: "bold",
    paddingLeft: 15,
  },
  emailContainerStyle: {
    flexDirection: "row",
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    height: SCREEN_HEIGHT / 13,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: Colors.primary,
  },
  emailTextStyle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
    marginLeft: 25,
  },
  servicesAndPrivacyTextStyle: {
    color: "black",
    fontWeight: "bold",
  },
  skipButtonStyle: {
    position: "absolute",
    right: "2%",
    top: "5%",
    backgroundColor: "#d3d3d3",
    borderRadius: 20,
    opacity: 0.7,
  },
});

export default StartScreen;
