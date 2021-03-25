import React, { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions
} from "react-native";
import Seat from "../components/seat";
import { Button } from "react-native-paper";
import { useSelector, useDispatch, } from "react-redux";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import fonts from "../constants/fonts";
import * as bookingActions from "../store/actions/Bookings";
import Svg,{Ellipse} from "react-native-svg"
const SCREEN_WIDTH=Dimensions.get("window").width

export default function AddSeatsScreen({ route, navigation }) {
  const [count, setCount] = useState(0);
  const [price, setPrice] = useState(0);
  const [isLoading, setisLoading] = useState(false);
  const { movie_id, time,tryingToBookSeats } = route.params;
  const totalBookedSeats=useSelector(state=>state.Bookings.bookedSeats)
  const [seats, setSeats] = useState(tryingToBookSeats?tryingToBookSeats:[]);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.Auth.token);

  let bookedSeats=totalBookedSeats.filter((details)=>{
    if(details.movie_id === movie_id && details.time === time){
      return true
    }else{
      return false
    }
  })

bookedSeats=JSON.parse(bookedSeats[0].seats)
  


  useEffect(()=>{
    navigation.setOptions({title:"Select Seats"})
  },[navigation])

  useEffect(() => {
    let newPrice = 0;
    seats.map((seat) => {
      newPrice+=28
    });
    setPrice(newPrice);
  });


  const getSeats=()=>{
    let allSeats=[]
    let letter="A"

    for (let i = 1; i <= 8; i++) {
      if(i === 1 || i === 8){
        for (let j = 1; j <= 6; j++) {
         allSeats.push({_id:`${letter}${j}`}) 
        }
        letter = String.fromCharCode(letter.charCodeAt(0) + 1);
      }else{
        for (let j = 1; j <= 8; j++) {
          allSeats.push({_id:`${letter}${j}`}) 
         }
         letter = String.fromCharCode(letter.charCodeAt(0) + 1);
      }
      
    }

   return <View style={{marginTop:70}} > 
    {getASeats(allSeats)}
    {getBToGSeats(allSeats)}
    {getHSeats(allSeats)}
 </View>
  }

  const getASeats=(allSeats)=>{
    return <View style={{width:"98%",flexDirection:"row",justifyContent:"center",alignItems:"center"}} >
      {allSeats.map(seat=>{
        if(seat._id[0]==="A"){
          if(seat._id=== "A1"){
            return <View style={{marginLeft:10}} ><Seat seat_id={seat._id} seats={seats} setSeats={setSeats} bookedSeats={bookedSeats}/></View>
          }else if(seat._id==="A3"){
            return <View style={{marginRight:30}} ><Seat seat_id={seat._id} seats={seats} setSeats={setSeats} bookedSeats={bookedSeats}/></View>
          }else{
            return <View ><Seat seat_id={seat._id} seats={seats} setSeats={setSeats} bookedSeats={bookedSeats}/></View>
         
          }
        }
      })}
    </View>
  }

  const getBToGSeats=(allSeats)=>{
    return <View style={{width:"100%",flexDirection:'row',flexWrap:"wrap",alignItems:"center",justifyContent:"center"}} >
      {allSeats.map(seat=>{
        if(seat._id[0]!=="A" && seat._id[0]!=="H")
        if(seat._id[1]==="4"){
          return <View style={{marginRight:30}} ><Seat seat_id={seat._id} seats={seats} setSeats={setSeats} bookedSeats={bookedSeats}/></View>
       
        }else{
          return    <View ><Seat seat_id={seat._id} seats={seats} setSeats={setSeats} bookedSeats={bookedSeats} /></View>
       
        }
      })}
    </View>
  }

  const getHSeats=(allSeats)=>{
    return <View style={{width:"98%",flexDirection:"row",justifyContent:"center",alignItems:"center"}} >
      {allSeats.map(seat=>{
        if(seat._id[0]==="H"){
          if(seat._id=== "H1"){
            return <View style={{marginLeft:10}} ><Seat seat_id={seat._id} seats={seats} setSeats={setSeats} bookedSeats={bookedSeats}/></View>
          }else if(seat._id==="H3"){
            return <View style={{marginRight:30}} ><Seat seat_id={seat._id} seats={seats} setSeats={setSeats} bookedSeats={bookedSeats}/></View>
          }else{
            return <View ><Seat seat_id={seat._id} seats={seats} setSeats={setSeats} bookedSeats={bookedSeats}/></View>
         
          }
        }
      })}
    </View>
  }

  console.log(seats);
  return (
    <View style={styles.container}>
      <View style={{alignSelf:"flex-end",margin:20,position:"absolute",right:20}} >
        <Text style={{color:"#fff",fontWeight:"bold",fontSize:25}} >{time} hr</Text>
      </View>
      <Svg height="100" width="400" style={{alignItems:"center",marginTop:20}} >
      <Ellipse
    
      cx="200"
      cy="120"
      rx="200"
      ry="50"
      stroke="#888"
      strokeWidth="4"
      fill="transparent"
      />
      </Svg>
      {getSeats()}
      <View style={{flexDirection:"row",justifyContent:"space-around",marginVertical:25,width:"100%"}} >
        <View style={styles.labelStyle} >
        <MaterialCommunityIcons name="checkbox-blank-outline" size={24} color="#536EE4" />
        <Text style={styles.whiteColor} >Available</Text>
        </View>
        <View style={styles.labelStyle} >
        <MaterialCommunityIcons name="checkbox-blank" size={24} color="#536EE4" />
        <Text style={styles.whiteColor} >Selected</Text>
        </View>
        <View style={styles.labelStyle} >
        <MaterialCommunityIcons name="checkbox-blank" size={24} color="#454B6B" />
        <Text style={styles.whiteColor} >Reserved</Text>
        </View>
      </View>
      <View style={{alignSelf:"flex-start",margin:15}} > 
        <Text style={{color:"#fff",fontSize:20}} ><Text style={{fontWeight:"bold"}} >Date:</Text> April 6,Thursday</Text>
      </View>
      <View style={{flexDirection:"row",alignItems:"center",justifyContent:"space-around",marginHorizontal:15,width:"100%"}} >
        <View style={{alignItems:"center"}} >
          <Text style={styles.whiteColor} >{seats.length} Seats</Text>
          <Text style={{color:"#A16834",fontSize:25,fontWeight:"bold"}} >$ {price}</Text>
        </View>
        <Button color="#536EE4" onPress={()=>{
          navigation.navigate("Movie",{
            seats:seats,
            price:price
          })
        }} mode="contained" style={{width:"60%",overflow:"hidden",borderRadius:25}} contentStyle={{padding:15}} >Confirm</Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "#070E2D",
    alignItems: "center",
    // justifyContent: "center",
  },
  whiteColor:{
    color:"#fff",
    marginLeft:10
  },
  labelStyle:{
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"center"
  }
});
