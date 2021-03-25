import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import CustomCarousel from "../components/General/Carousel";
import Colors from "../constants/Colors";
import * as movieActions from "../store/actions/Movies";
import * as bookingActions from "../store/actions/Bookings"
import { AntDesign } from '@expo/vector-icons';
const HomeScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const movies = useSelector((state) => state.Movie.movies);
  const userDetails=useSelector(state=>state.Profile)
  const token=useSelector(state=>state.Auth.token)
  console.log(movies);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchMovies = async () => {
      setIsLoading(true);
      await dispatch(movieActions.getAllMovies());
      await dispatch(bookingActions.getAllBookedSeats(token))
      setIsLoading(false);
    };
    fetchMovies();
  }, []);


  const getRatings=()=>{
    
    return <View style={{flexDirection:"row",alignItems:"center"}} >

      <AntDesign name="star" size={15} color="#FA7308" style={{marginRight:5}}/>
      <AntDesign name="star" size={15} color="#FA7308" style={{marginRight:5}}/>
      <AntDesign name="star" size={15} color="#FA7308" style={{marginRight:5}}/>
      <AntDesign name="star" size={15} color="#FA7308" style={{marginRight:5}}/>
      <AntDesign name="staro" size={15} color="#FA7308" style={{marginRight:5}}/>
    </View>
    
  }

  if (isLoading) {
    return (
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          flex: 1,
          backgroundColor: Colors.bkg,
        }}
      >
        <ActivityIndicator size="large" color={Colors.tertiary} />
        <Text style={{ fontSize: 20, marginVertical: 15, fontStyle: "italic" }}>
          Getting credentials...
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={{ margin: 20 }}>
        <FlatList 
        data={movies}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <>
          <Text style={styles.name} >Hello, {userDetails.username}</Text>
        <Text style={styles.subTitle} >Book your favorite movie</Text>
        
 
        <FlatList
          data={movies}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => `${item.movie_id}`}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Movie", {
                    movie_id: item.movie_id,
                    seats:null,
                    price:null
                  });
                }}
                style={{
                  height: 350,
                  width: 210,
                  overflow: "hidden",
                  marginHorizontal: 10,
                }}
              >
                <View style={{ width: "100%", height: 260 }}>
                  <Image
                    source={{ uri: item.imageURL }}
                    style={{ width: "100%", height: "100%", borderRadius: 10 }}
                  />
                </View>
                <Text style={{ fontWeight: "500", fontSize: 20,marginTop:15 }}>
                  {item.movie_name}
                </Text>
                {getRatings()}
              </TouchableOpacity>
            );
          }}
        />
        <Text style={{fontSize:22,fontWeight:"500",marginVertical:15}} >Popular</Text>
        
          </>
        }
        keyExtractor={(item) => `${item.movie_id}`}
          renderItem={({ item }) => {
            let genres=JSON.parse(item.movie_genre) 
            genres=genres.join(",")   
            return (
              <TouchableOpacity
              
                onPress={() => {
                  navigation.navigate("Movie", {
                    movie_id: item.movie_id,
                    seats:null,
                    price:null
                  });
                }}
                style={{
                  height: 150,
                  width:"100%",
                  overflow: "hidden",
                  marginHorizontal: 10,
                  flexDirection:"row",
                  padding:10
                }}
              >
                <View style={{ width:"30%", height: 130 }}>
                  <Image
                    source={{ uri: item.imageURL }}
                    style={{ width: "100%", height: "100%", borderRadius: 20 }}
                  />
                </View>
                <View style={{padding:15}} >
                <Text style={{ fontWeight: "500", fontSize: 20,marginBottom:15 }}>
                  {item.movie_name}
                </Text>
                {getRatings()}
                <Text style={{color:"#888",marginTop:10}} >
                  {genres}</Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  name:{
    fontSize:25,
    fontWeight:"bold",
    marginBottom:15
  },
  subTitle:{
    color:"#888",
    fontSize:18,
    marginBottom:10
  },
  iconContainer: {
    margin: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  textStyle: {
    margin: 10,
  },
});
