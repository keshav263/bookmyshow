import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Image,
} from "react-native";
import { ActivityIndicator, Button } from "react-native-paper";
import Colors from "../../constants/Colors";
import BackButton from "../../components/General/BackButton";
import { useDispatch } from "react-redux";
import * as authActions from "../../store/actions/Auth";
import OTPInputView from "@twotalltotems/react-native-otp-input";
const OTPScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const [otp, setOtp] = useState("");
  const { email, username, login } = route.params;
  const [isLoading, setIsLoading] = useState(false);
  console.log("Inside OTPScreen");
  console.log(username);
  const getOtp = useCallback(async () => {
    try {
      setIsLoading(true);

      if (login) {
        await dispatch(authActions.signInEmail(email));
      } else {
        await dispatch(authActions.signUpEmail(email, username));
      }

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
        if (login) {
          await dispatch(authActions.authenticateSignInEmail(email, code));
        } else {
          await dispatch(
            authActions.authenticateSignUpEmail(email, code, username)
          );
        }
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
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={{ marginHorizontal: 15 }}
          onPress={() => navigation.goBack()}
        >
          <BackButton />
        </TouchableOpacity>
        <Text style={{ fontSize: 16, fontWeight: "bold" }}>Enter the code</Text>
      </View>
      <View style={styles.imageContainer}>
        <Image
          source={require("../../../assets/check-mail.png")}
          resizeMode="cover"
          style={{ width: "60%", height: 100 }}
        />
      </View>
      <View style={{ margin: 40 }}>
        <Text style={styles.title}>
          To confirm your email address,please enter the OTP we sent to {email}.
          Please make sure you check spam mails as well
        </Text>
      </View>

      <View style={styles.otpContainer}>
        <OTPInputView
          style={styles.otpStyle}
          pinCount={6}
          code={otp}
          editable={true}
          onCodeChanged={(code) => setOtp(code)}
          autoFocusOnLoad
          codeInputFieldStyle={styles.inputFieldStyle}
          codeInputHighlightStyle={{}}
          onCodeFilled={verifyOtp}
        ></OTPInputView>
      </View>
      <Button
        mode="contained"
        color={Colors.primary}
        onPress={() => getOtp()}
        contentStyle={{ marginVertical: 5 }}
        style={{ margin: 10, marginVertical: 30, borderRadius: 5 }}
      >
        Resend verification email
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.bkg },
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
  inputFieldStyle: {
    color: "black",
    fontWeight: "bold",
    borderWidth: 2,
  },
  title: {
    textAlign: "center",
    fontSize: 18,
    fontStyle: "italic",
  },
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
});

export default OTPScreen;
