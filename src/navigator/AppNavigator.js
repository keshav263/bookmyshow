import { NavigationContainer } from "@react-navigation/native";
import AuthNavigator from "./AuthNavigator";
import React from "react";
import { useSelector } from "react-redux";
import FlowNavigator from "./FlowNavigator";
import InitialScreen from "../screens/InitialScreen";
import AddSeatsScreen from "../screens/AddSeatsScreen";

const AppNavigator = () => {
  const Auth = useSelector((state) => state.Auth);
  const { isAuth, didTryAutoLogin } = Auth;
  return (
    <NavigationContainer>
      {isAuth && <FlowNavigator />}
      {didTryAutoLogin && !isAuth && <AuthNavigator />}
      {!didTryAutoLogin && !isAuth && <InitialScreen />}
    </NavigationContainer>
  );
};

export default AppNavigator;
