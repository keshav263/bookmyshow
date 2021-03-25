import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View, Image, ScrollView, ActivityIndicator, FlatList, TouchableOpacity,Dimensions } from "react-native";
import { Button } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import DropDownPicker from 'react-native-dropdown-picker';
import { AntDesign,EvilIcons } from '@expo/vector-icons';
import RBSheet from "react-native-raw-bottom-sheet"
const imdbApiKey="k_po5euopn"

const SCREEN_HEIGHT=Dimensions.get("screen").height

const MovieScreen = ({ route, navigation }) => {

  const movies = useSelector((state) => state.Movie.movies);
  const [editedCast,setEditedCast]=useState([])
  const { movie_id,seats,price } = route.params;
  const refRBSheet = useRef();
  const movie = movies.filter((x) => x.movie_id === movie_id);
  const [isLoading,setIsLoading]=useState(false)
  const [items,setItems]=useState([])
  const [time,setTime]=useState(movie[0].timing[0])
  let totalMinutes = movie[0].duration;
  let hrs = Math.trunc(totalMinutes / 60);
  let minutes = totalMinutes % 60;
 
  let genres = JSON.parse(movie[0].movie_genre);
  let languages = JSON.parse(movie[0].language);
  languages=languages.join(",")
  let cast = JSON.parse(movie[0].cast);
  let seatsId=[]
  if(seats){
    seats.map((seat)=>{
      seatsId.push(seat._id)
    })
    seatsId=seatsId.join(",")
  }

  useEffect(()=>{
    if(price){
      refRBSheet.current.open()
    }
  })
 

  const getTimings=()=>{
    let newArray=[];
    movie[0].timing.map(time=>{
      newArray.push({label:time,value:time})
      
    })
    setItems(newArray)
    
  }

  useEffect(()=>{
    getTimings()
  },[])
  
  
  const fetchPicture=async(name)=>{
    setIsLoading(true)
    const response=await fetch(`https://imdb-api.com/en/API/SearchName/${imdbApiKey}/${name}`)
      const responseJson=await response.json()
    setIsLoading(false)

     return responseJson.results[0].image
   
  }

  const getCastPics=async()=>{
    console.log("getCastPics called:")

   let newArr=[]
   let states=[]
    
      cast.map(async(name)=>{
      setIsLoading(true)
      const pic=await fetchPicture(name)
     
      setIsLoading(false)
     
      states=[{name,imageURL:pic}]
      newArr=newArr.concat(states)
    
      setEditedCast(newArr)
      
    })
    
  
   
    

    

  
  }


  useEffect(()=>{
  const x=async()=>{
   setIsLoading(true)
   getCastPics()
   
   setIsLoading(false)
 }
    x()
  },[])


  useEffect(()=>{
    navigation.setOptions({
      title:movie[0].movie_name
    })
  },[navigation,movie[0].movie_name])


  
// console.log("Edited Cast")
// console.log(editedCast)
 

  const getRatings=()=>{
    
    return <View style={{flexDirection:"row",alignItems:"center",marginTop:10}} >

      <AntDesign name="star" size={15} color="#FA7308" style={{marginRight:5}}/>
      <AntDesign name="star" size={15} color="#FA7308" style={{marginRight:5}}/>
      <AntDesign name="star" size={15} color="#FA7308" style={{marginRight:5}}/>
      <AntDesign name="star" size={15} color="#FA7308" style={{marginRight:5}}/>
      <AntDesign name="staro" size={15} color="#FA7308" style={{marginRight:5}}/>
    </View>
  }

  if(isLoading){
    return <View style={{flex:1,alignItems:"center",justifyContent:"center"}} >
      <ActivityIndicator color="green" size="large" />
    </View>
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false} >
      <View style={{alignItems:"center",margin:15}} >
      <Image
        source={{ uri: movie[0].imageURL }}
        style={{ width: "70%", height: 350,borderRadius:20 }}
      />
      {getRatings()}
      </View>
     
      {items.length===0? <Text style={[styles.titleStyle,{textAlign:"center"}]} >Coming Soon</Text>: <View style={{ margin: 15,flexDirection:"row",justifyContent:"center",marginVertical:20,alignItems:"center",zIndex:9999999 }}>
        <View style={{width:"15%"}} >
          <Text style={styles.titleStyle} >27</Text>
          <Text style={styles.subTitleColor} >Date</Text>
        </View>
        <View style={{width:"27%",marginRight:10}} >
      <DropDownPicker
    items={items}
    defaultValue={time}
    
    labelStyle={styles.titleStyle}

    style={{backgroundColor:"#f3f5f7",borderWidth:0}}
    itemStyle={{
        justifyContent: 'flex-start'
    }}
    dropDownStyle={{backgroundColor:"#f3f5f7",borderBottomLeftRadius:20,borderBottomRightRadius:20,borderTopLeftRadius:20,borderTopRightRadius:20}}
    onChangeItem={item => {
      setTime(item.label)
    } }
/>
<Text style={[styles.subTitleColor,{position:"relative",bottom:5,left:15}]} >Hour</Text>
</View>
        
        <TouchableOpacity  onPress={()=>navigation.navigate("AddSeats",{movie_id:movie_id,time:time,tryingToBookSeats:seats?seats:null})} style={{width:"45%",borderWidth:StyleSheet.hairlineWidth,padding:15,borderRadius:15,flexDirection:"row",alignItems:"center",justifyContent:"center"}} >
          <View>
          <Text style={styles.titleStyle} >{seats?seatsId: "Select Seat"}</Text>
          <Text style={styles.subTitleColor} >Seat No</Text>

          </View>
          <EvilIcons name="chevron-right" size={30} color="black" style={{paddingHorizontal:5}}/>
          
        </TouchableOpacity>
        
        </View>}
        <View style={{marginHorizontal:30}} >
        <View style={{marginVertical:10}}>

<Text style={styles.titleStyle} >Available in</Text>
<Text style={styles.subTitleColor} >2D</Text>
<Text style={styles.subTitleColor} >{languages}</Text>
</View>
          <View style={{marginVertical:10}}>

          <Text style={styles.titleStyle} >Duration</Text>
          <Text style={styles.subTitleColor} >{hrs}hr {minutes}min</Text>
          </View>
          <View style={{marginVertical:10}} >
          <Text style={styles.titleStyle} >Plot</Text>
          <Text style={styles.subTitleColor} >{movie[0].description}</Text>
        </View>
        <View style={{marginVertical:10}} >
          <Text style={styles.titleStyle} >Cast</Text>
          <FlatList data={editedCast} keyExtractor={(item)=>item.name} 
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          
          renderItem={({item})=>{
        
            return <View style={{marginHorizontal:15}} >
              <Image style={{height:100,width:100,borderRadius:15}}  source={{uri:item.imageURL}} />
              <Text style={{textAlign:"center",width:100,fontWeight:"bold",color:"#888"}} >{item.name}</Text>
            </View>
          }}
          />
        </View>
        </View>
        {price && <RBSheet
        ref={refRBSheet}
        height={120}
        
        closeOnDragDown={true}
        customStyles={{
          wrapper: {
            backgroundColor:"transparent"
          },
          container:{
            backgroundColor: "#f3f5f7",
          },
          draggableIcon: {
            backgroundColor: "#000",
          },
        }}
      >
        <View style={{  flexDirection:"row",alignItems:"center",justifyContent:"space-around",width:"100%"}} >
        <View style={{alignItems:"center"}} >
          <Text style={{}} >Price:</Text>
          <Text style={{color:"#A16834",fontSize:25,fontWeight:"bold"}} >$ {price}</Text>
        </View>
        <TouchableOpacity  onPress={()=>{
          navigation.navigate("Checkout",{
            movie_id:movie_id,
            seats:seats,
            price:price,
            time
          })
          refRBSheet.current.close()
        }} style={{width:"60%",padding:20,borderRadius:20,backgroundColor:"black",alignItems:"center"}} >
          <Text style={{color:"#fff",fontSize:23}} >Book</Text>
        </TouchableOpacity>
      </View>
      </RBSheet>}
       
    </ScrollView>
  );
};

export default MovieScreen;

const styles = StyleSheet.create({
  container: {
    flex:1
  },
  titleStyle:{fontSize:21,fontWeight:"bold",marginBottom:10},
  subTitleColor:{
    color:"#888",
    zIndex:-99
  }
});
