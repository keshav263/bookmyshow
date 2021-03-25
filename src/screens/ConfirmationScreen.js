import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import LottieView from "lottie-react-native";
import Colors from "../constants/Colors";
import { Button } from "react-native-paper";
import { StackActions } from "@react-navigation/native";
import { useSelector } from "react-redux";
import {LinearGradient} from 'expo-linear-gradient';
import Svg,{Circle} from "react-native-svg"
import {Entypo} from "@expo/vector-icons"
const imdbApiKey="k_po5euopn"

const ConfirmationScreen = ({ navigation }) => {
   const bookingDetails = useSelector((state) => state.Bookings);
   const [coverPic,setCoverPic]=useState("")

   const fetchPicture=async()=>{
    const response=await fetch(`https://imdb-api.com/en/API/SearchMovie/${imdbApiKey}/${bookingDetails.movie_details.movie_name}`)
    const responseJson=await response.json()
    console.log(responseJson)
    setCoverPic(responseJson.results[0].image)
   }

  useEffect(()=>{
    fetchPicture()
  },[])

 
  return (
    <>
    <View style={styles.container} >

     
      
      <Text style={{color:"#888",fontSize:25,fontWeight:"bold",marginTop:20}} >{bookingDetails.time}</Text>
      <Text style={{color:"#fff",fontSize:30,fontWeight:"bold"}} >{bookingDetails.movie_details.movie_name}</Text>
      <View style={{width:"100%",alignItems:"center",justifyContent:"flex-start",marginVertical:15}} >
      <View style={{width:"60%",height:80,backgroundColor:"white",borderTopLeftRadius:25,borderTopRightRadius:25,borderBottomWidth:1}} >
        <Text style={{color:"black",fontSize:25,textAlign:"right",margin:15,fontWeight:"bold"}} >{bookingDetails.movie_details.duration} min</Text>
      </View>
      <View style={{width:"60%",height:200,backgroundColor:"white",borderBottomEndRadius:25,borderBottomLeftRadius:25,justifyContent:"center"}}>
        <Image style={{width:"90%",height:"80%",alignSelf:"center"}} source={require("../../assets/barcode.png")} />
      </View>
      <Svg height="200" width="100" style={{position:"absolute",left:30,top:30}} >
        <Circle cx="50" cy="50" r="20" fill="#070E2D" />
      </Svg>
      <Svg height="100" width="100" style={{position:"absolute",right:30,top:30}} >
        <Circle cx="50" cy="50" r="20" fill="#070E2D" />
      </Svg>
      </View>
     
    
        <Image style={{width:"100%",height:"50%",position:"absolute",bottom:0,opacity:0.4}} resizeMode="cover" source={{uri:coverPic}}  />
    
     <View style={{borderTopWidth:1,borderStartWidth:1,borderRightWidth:1,borderColor:"#888",borderRadius:25,width:"90%",alignItems:"center",padding:20,position:"absolute",bottom:0}} >
        <Text style={{color:"#888",fontSize:15}} >Seats</Text>
        <Text style={{color:"#fff",fontSize:25,marginVertical:10,marginBottom:25}} >{bookingDetails.seats.join(",")}</Text>
        <Text style={{color:"#888",fontSize:20}} >Audi 1</Text>
        
        <Text style={{color:"#fff",fontSize:25,marginVertical:10}} >5 April</Text>
        <Text style={{color:"#888",fontSize:15,marginBottom:25}} >{bookingDetails.time}</Text>
        <Text style={{color:"#888",fontSize:15}} >Booking Id</Text>
        <Text style={{color:"#fff",fontSize:25,marginVertical:10,marginBottom:25}} >{bookingDetails.booking_id}</Text>
        
      </View>
      
     
    </View>
     <LinearGradient colors={["#070E2D","#0010F0","#070E2D"]} 
    start={{x:0.7,y:0.1}}
    end={{x:0.2,y:0.3}}
    style={{position:"absolute",
    opacity:0.3,
    width:"100%",
    height:"100%"}}>
    </LinearGradient>
     <TouchableOpacity  onPress={()=>{
        navigation.navigate("Home")
      }} style={{alignSelf:"flex-start",marginHorizontal:20,zIndex:9999,position:"absolute",top:40}} >
        <Entypo name="chevron-left" size={30} color="white" />
      </TouchableOpacity>
    </>
  );
};

export default ConfirmationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"#070E2D",
    alignItems: "center",
    paddingTop:60,
   
  },
});
