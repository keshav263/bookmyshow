import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  ToastAndroid,
} from "react-native";
import { TextInput, Button } from "react-native-paper";
import Colors from "../../constants/Colors";
import { useForm, Controller } from "react-hook-form";
import BackButton from "../../components/General/BackButton";
import * as authActions from "../../store/actions/Auth";
import { useDispatch } from "react-redux";

const SignInScreen = ({ navigation }) => {
  const { control, handleSubmit, errors } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const showInvalidInputToast = (message) => {
    ToastAndroid.showWithGravityAndOffset(
      message,
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM,
      25,
      50
    );
  };

  const onSubmit = useCallback(
    async (data) => {
      try {
        setIsLoading(true);
        await dispatch(authActions.signInEmail(data.email));
        setIsLoading(false);
        navigation.navigate("OTPEmail", {
          email: data.email,
          login: true,
        });
      } catch (error) {
        console.log(error);
        setIsLoading(false);
        return Alert.alert("Invalid", "Email or password is incorrect", [
          {
            text: "Okay",
          },
        ]);
      }
    },
    [setIsLoading, isLoading]
  );

  useEffect(() => {
    errors.email ? showInvalidInputToast("Please provide a valid email") : null;
  }, [errors]);

  return (
    <KeyboardAvoidingView
      contentContainerStyle={styles.container}
      behavior="padding"
      keyboardVerticalOffset={20}
    >
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={{ marginHorizontal: 15 }}
          onPress={() => navigation.goBack()}
        >
          <BackButton />
        </TouchableOpacity>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Login</Text>
      </View>

      <Controller //CHECK FOR EMAIL REGEX!!
        control={control}
        render={({ onChange, onBlur, value }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            value={value}
            theme={{ colors: { primary: Colors.primary } }}
            mode="flat"
            label="Email"
            autoCompleteType="email"
            autoFocus={true}
            underlineColor="green"
          />
        )}
        name="email"
        rules={{
          required: true,
          pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        }}
        defaultValue=""
      />
      <Text
        style={{ marginHorizontal: 15, fontStyle: "italic", color: "black" }}
      >
        We will send you an email with OTP
      </Text>

      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          loading={isLoading}
          disabled={isLoading}
          contentStyle={{ paddingVertical: 5 }}
          color={Colors.tertiary}
          onPress={handleSubmit(onSubmit)}
        >
          Continue
        </Button>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  backButtonStyle: {
    position: "absolute",
    marginLeft: 15,
    marginTop: 20,
    zIndex: 1000,
  },
  buttonContainer: {
    margin: 10,
    marginTop: 40,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.bkg,
  },
  errorMessage: {
    color: "red",
    marginHorizontal: 15,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 35,
  },
  input: {
    backgroundColor: "transparent",
    marginHorizontal: 15,
    marginTop: 10,
  },
});

export default SignInScreen;
