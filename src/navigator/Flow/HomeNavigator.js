import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../../screens/HomeScreen";
import MovieScreen from "../../screens/MovieScreen";
import SelectSeatScreen from "../../screens/SelectSeatScreen";
import AddSeatsScreen from "../../screens/AddSeatsScreen";
import ConfirmationScreen from "../../screens/ConfirmationScreen";
import PaymentScreen from "../../screens/PaymentScreen";
const HomeStackNavigator = createStackNavigator();

const HomeNavigator = () => {
  return (
    <HomeStackNavigator.Navigator>
      <HomeStackNavigator.Screen name="Home" component={HomeScreen} />
      <HomeStackNavigator.Screen name="Movie" component={MovieScreen} />
      <HomeStackNavigator.Screen name="AddSeats" component={AddSeatsScreen}   options={{headerTintColor:"white",headerStyle:{
        backgroundColor:"#070E2D",
        }}} />
        <HomeStackNavigator.Screen name="Checkout" component={PaymentScreen}/>
      <HomeStackNavigator.Screen
        name="Confirm"
        component={ConfirmationScreen}
        options={{headerShown:false}}
      />
    </HomeStackNavigator.Navigator>
  );
};

export default HomeNavigator;
