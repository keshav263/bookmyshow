import React, { useState } from "react"
import {View,Text,StyleSheet, Image,TouchableOpacity, ActivityIndicator} from "react-native"
import { useSelector,useDispatch } from "react-redux";
import * as bookingActions from "../store/actions/Bookings"

import {EvilIcons,MaterialCommunityIcons} from "@expo/vector-icons"

const PaymentScreen=({route,navigation})=>{
    const movies = useSelector((state) => state.Movie.movies);
    const dispatch=useDispatch()
    const [isLoading,setIsLoading]=useState(false)
    const { movie_id,seats,price,time } = route.params;
    const [paymentId,setPaymentId]=useState(1)
    const movie = movies.filter((x) => x.movie_id === movie_id);
    const token = useSelector((state) => state.Auth.token);

    let seatsId=[]
     seats.map((seat)=>{
      seatsId.push(seat._id)
    })
    seatsId=seatsId.join(",")
    let genres = JSON.parse(movie[0].movie_genre);
    genres=genres.join(",")

    if(isLoading){
      return <View style={{flex:1,alignItems:"center",justifyContent:"center"}} >
        <ActivityIndicator color="blue" size="large"/>
      </View>
    }

    return <View style={styles.container} >
        <View style={{flexDirection:"row",alignItems:"center"}} >
            <Image style={{width:130,height:150,borderRadius:15}} source={{uri:movie[0].imageURL}} />
            <View style={{marginLeft:20}} >
                <Text style={{fontSize:25,fontWeight:"bold",marginVertical:20}} >{movie[0].movie_name}</Text>
                <Text style={{color:"#888",fontSize:18}} >{genres}</Text>
            </View>
        </View>
        <View style={{ margin: 15,flexDirection:"row",justifyContent:"center",marginVertical:20,alignItems:"center",zIndex:9999999 }}>
        <View style={{width:"22%"}} >
          <Text style={styles.titleStyle} >27</Text>
          <Text style={styles.subTitleColor} >Date</Text>
        </View>
        <View style={{width:"27%",marginRight:10}} >
     <Text style={styles.titleStyle} >{time}</Text>
<Text style={styles.subTitleColor} >Hour</Text>
</View>
        
        <TouchableOpacity style={{width:"45%",padding:15,borderRadius:15,flexDirection:"row",alignItems:"center",justifyContent:"center"}} >
          <View>
          <Text style={styles.titleStyle} >{seatsId}</Text>
          <Text style={styles.subTitleColor} >Seat No</Text>

          </View>
          <EvilIcons name="chevron-right" size={30} color="black" style={{paddingHorizontal:5}}/>
          
        </TouchableOpacity>
        
        </View>
        <Text style={styles.titleStyle} >Payment Method</Text>
        <View>
            <TouchableOpacity style={styles.paymentMethodContainer}  onPress={()=>{setPaymentId(1)}} >
                <Image style={styles.paymentIconStyle} source={require("../../assets/mastercard.png")} />
                <Text style={styles.paymentTextStyle} >Mastercard</Text>
                <MaterialCommunityIcons  style={{position:"absolute",right:10}} name={paymentId===1?"checkbox-marked-circle":"checkbox-marked-circle-outline"} size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.paymentMethodContainer} onPress={()=>{setPaymentId(2)}}>
                <Image style={styles.paymentIconStyle} source={require("../../assets/visa.png")} />
                <Text style={styles.paymentTextStyle} >Visa</Text>
                <MaterialCommunityIcons style={{position:"absolute",right:10}}  name={paymentId===2?"checkbox-marked-circle":"checkbox-marked-circle-outline"} size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.paymentMethodContainer} onPress={()=>{setPaymentId(3)}}>
                <Image style={styles.paymentIconStyle} source={require("../../assets/paytm.png")} />
                <Text style={styles.paymentTextStyle} >Paytm</Text>
                <MaterialCommunityIcons style={{position:"absolute",right:10}} name={paymentId===3?"checkbox-marked-circle":"checkbox-marked-circle-outline"} size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.paymentMethodContainer} onPress={()=>{setPaymentId(4)}}>
                <Image style={styles.paymentIconStyle} source={require("../../assets/paypal.png")} />
                <Text style={styles.paymentTextStyle} >Paypal</Text>
                <MaterialCommunityIcons style={{position:"absolute",right:10}} name={paymentId===4?"checkbox-marked-circle":"checkbox-marked-circle-outline"} size={24} color="black" />
            </TouchableOpacity>
        </View>
        <TouchableOpacity  onPress={async()=>{
          setIsLoading(true);
                let arrayOfSeats = seats.map((seat) => {
                  return seat._id;
                });
                await dispatch(
                  bookingActions.bookSeats(arrayOfSeats, time, movie_id, token)
                );
                setIsLoading(false);
                navigation.navigate("Confirm");

         
        }} style={{width:"100%",padding:20,borderRadius:20,backgroundColor:"black",alignItems:"center",position:"absolute",bottom:20}} >
          <Text style={{color:"#fff",fontSize:23}} >Pay ${price}</Text>
        </TouchableOpacity>
      </View>

}

export default PaymentScreen


const styles=StyleSheet.create({
    container:{
        flex:1,
        margin:20
    },titleStyle:{fontSize:21,fontWeight:"bold",marginBottom:10},
  subTitleColor:{
    color:"#888",
    zIndex:-99
  },
  paymentMethodContainer:{
    flexDirection:"row",alignItems:"center",marginVertical:10
  },
  paymentIconStyle:{width:50,height:50},
  paymentTextStyle:{
      fontSize:20,marginHorizontal:20,fontWeight:"400"
  }
})