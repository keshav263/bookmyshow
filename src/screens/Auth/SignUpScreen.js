import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
  ActivityIndicator,
} from "react-native";
import { TextInput, Button } from "react-native-paper";
import Colors from "../../constants/Colors";
import { useForm, Controller } from "react-hook-form";
import BackButton from "../../components/General/BackButton";
import * as authActions from "../../store/actions/Auth";
import { useDispatch } from "react-redux";

const SignUpScreen = ({ navigation }) => {
  const { control, handleSubmit, errors } = useForm();
  const dispatch = useDispatch();
  console.log(errors);

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = useCallback(async (data) => {
    try {
      setIsLoading(true);
      await dispatch(authActions.signUpEmail(data.email, data.username));
      setIsLoading(false);
      navigation.navigate("OTPEmail", {
        email: data.email,
        username: data.username,
      });
    } catch (error) {
      setIsLoading(false);
      return alert("Please try another email");
    }
  }, []);

  const showInvalidInputToast = (message) => {
    ToastAndroid.showWithGravityAndOffset(
      message,
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM,
      25,
      50
    );
  };

  useEffect(() => {
    errors.username
      ? showInvalidInputToast("Username length must be greater than 3")
      : errors.email
      ? showInvalidInputToast("Please provide a valid email")
      : null;
  }, [errors]);

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
          onPress={() => navigation.navigate("Start")}
        >
          <BackButton />
        </TouchableOpacity>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>
          Create a new account
        </Text>
      </View>
      <Controller
        control={control}
        render={({ onChange, onBlur, value }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            value={value}
            mode="flat"
            label="Username"
            autoCompleteType="name"
            autoFocus={true}
            theme={{ colors: { primary: Colors.primary } }}
          />
        )}
        name="username"
        rules={{ required: true, minLength: 3 }}
        defaultValue=""
      />

      <Controller //CHECK FOR EMAIL REGEX
        control={control}
        render={({ onChange, onBlur, value }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            value={value}
            mode="flat"
            label="Email"
            autoCompleteType="email"
            theme={{ colors: { primary: Colors.primary } }}
          />
        )}
        name="email"
        rules={{
          required: true,
          pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        }}
        defaultValue=""
      />

      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          color={Colors.tertiary}
          contentStyle={{ marginVertical: 5 }}
          onPress={handleSubmit(onSubmit)}
        >
          Continue
        </Button>
      </View>
      <View style={styles.signInContainerStyle}>
        <Text style={{ fontSize: 18 }}>
          Already have an account?
          <Text
            style={{ color: Colors.tertiary }}
            onPress={() => navigation.navigate("SignIn")}
          >
            Sign In
          </Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    backgroundColor: "transparent",
    marginHorizontal: 15,
  },
  inputContainer: {
    borderRadius: 30,
    overflow: "hidden",
    margin: 10,
    marginTop: 15,
    height: 60,
  },
  buttonContainer: {
    margin: 10,
    marginTop: 60,
  },
  errorMessage: {
    color: "red",
    marginHorizontal: 15,
  },
  signInContainerStyle: {
    margin: 10,
    alignItems: "center",
    justifyContent: "center",
    height: 20,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 35,
  },
});

export default SignUpScreen;
