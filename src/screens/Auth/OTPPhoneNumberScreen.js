import React, { useCallback, useState } from "react";
import { View, Text, StyleSheet, Alert, TouchableOpacity } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import Colors from "../../constants/Colors";
import BackButton from "../../components/General/BackButton";
import { useDispatch } from "react-redux";
import * as authActions from "../../store/actions/Auth";
import OTPInputView from "@twotalltotems/react-native-otp-input";
const OTPScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const [otp, setOtp] = useState("");
  const { phoneNumber } = route.params;
  const [isLoading, setIsLoading] = useState(false);

  const getOtp = useCallback(async () => {
    try {
      setIsLoading(true);
      await dispatch(authActions.signInUsingPhoneNumber(phoneNumber));
      setIsLoading(false);
    } catch (error) {
      return Alert.alert("Something went wrong", "Please try again!", [
        { text: "Okay" },
      ]);
    }
  }, [dispatch]);

  const verifyOtp = useCallback(
    async (code) => {
      try {
        if (!code) {
          throw new Error();
        }
        setIsLoading(true);
        await dispatch(
          authActions.verifyPhoneNumberForPhoneNumberSignIn(code, phoneNumber)
        );
      } catch (error) {
        setIsLoading(false);
        console.log(error);
        return Alert.alert("Invalid OTP", "Please try again", [
          { text: "Okay" },
        ]);
      }
    },
    [dispatch, setIsLoading]
  );

  if (isLoading) {
    return (
      <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
        <ActivityIndicator size="large" color={Colors.tertiary} />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: Colors.bkg }}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={{ marginHorizontal: 15 }}
          onPress={() => navigation.goBack()}
        >
          <BackButton />
        </TouchableOpacity>
        <Text style={{ fontSize: 16, fontWeight: "bold" }}>Enter the code</Text>
      </View>
      <View style={{ margin: 40,marginTop:20 }}>
        <Text style={styles.title}>
          We've sent a verification code to 
        </Text>
        <Text style={styles.title} >
        +91 | {phoneNumber}
        </Text>
      </View>

      <View style={styles.otpContainer}>
        <OTPInputView
          style={styles.otpStyle}
          pinCount={6}
          code={otp}
          onCodeChanged={(code) => setOtp(code)}
          autoFocusOnLoad
          codeInputFieldStyle={styles.inputFieldStyle}
          codeInputHighlightStyle={{}}
          onCodeFilled={verifyOtp}
        ></OTPInputView>
      </View>
      <View style={styles.noOtpTextContainerStyle}>
        <Text style={{ textAlign: "center", fontSize: 18 }}>
          Didn't get an OTP?{" "}
          <Text style={{ color: Colors.tertiary }} onPress={getOtp}>
            Resend now
          </Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  otpContainer: { height: 50, width: "100%" },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 35,
  },
  otpStyle: {
    width: "90%",
    height: 50,
    alignItems: "center",
    marginHorizontal: 20,
  },
  title: {
    textAlign: "center",
    fontSize: 16,
    width:"100%"
  },
  inputFieldStyle: {
    color: "black",
    fontWeight: "bold",
    borderWidth: 2,
  },
  noOtpTextContainerStyle: {
    position: "absolute",
    bottom: 0,
    marginBottom: 15,
    alignItems: "center",
    width: "100%",
  },
});

export default OTPScreen;
