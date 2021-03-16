import SignInScreen from "../screens/Auth/SignInScreen";
import SignUpScreen from "../screens/Auth/SignUpScreen";
import StartScreen from "../screens/Auth/StartScreen";
import React from "react";
import OTPPhoneNumberScreen from "../screens/Auth/OTPPhoneNumberScreen";

import { createStackNavigator } from "@react-navigation/stack";
import OTPEmailScreen from "../screens/Auth/OTPEmailScreen";
const AuthStackNavigator = createStackNavigator();

const AuthNavigator = () => {
  return (
    <AuthStackNavigator.Navigator screenOptions={{ headerShown: false }}>
      <AuthStackNavigator.Screen name="Start" component={StartScreen} />
      <AuthStackNavigator.Screen
        name="OTPPhoneNumber"
        component={OTPPhoneNumberScreen}
      />
      <AuthStackNavigator.Screen name="SignUp" component={SignUpScreen} />
      <AuthStackNavigator.Screen name="SignIn" component={SignInScreen} />

      <AuthStackNavigator.Screen name="OTPEmail" component={OTPEmailScreen} />
    </AuthStackNavigator.Navigator>
  );
};

export default AuthNavigator;
