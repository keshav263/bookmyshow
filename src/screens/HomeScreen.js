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

const HomeScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const movies = useSelector((state) => state.Movie.movies);
  console.log(movies);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchMovies = async () => {
      setIsLoading(true);
      await dispatch(movieActions.getAllMovies());
      setIsLoading(false);
    };
    fetchMovies();
  }, []);

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
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <TouchableOpacity onPress={() => {}}>
            <View style={styles.iconContainer}>
              <Image
                source={require("../../assets/movies.png")}
                style={{ width: 30, height: 30 }}
              />
              <Text style={styles.textStyle}>Movies</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}}>
            <View style={styles.iconContainer}>
              <Image
                source={require("../../assets/events.png")}
                style={{ width: 30, height: 30 }}
              />
              <Text style={styles.textStyle}>Events</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}}>
            <View style={styles.iconContainer}>
              <Image
                source={require("../../assets/sports.png")}
                style={{ width: 30, height: 30 }}
              />
              <Text style={styles.textStyle}>Sports</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}}>
            <View style={styles.iconContainer}>
              <Image
                source={require("../../assets/plays.png")}
                style={{ width: 30, height: 30 }}
              />
              <Text style={styles.textStyle}>Plays</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}}>
            <View style={styles.iconContainer}>
              <Image
                source={require("../../assets/activities.png")}
                style={{ width: 30, height: 30 }}
              />
              <Text style={styles.textStyle}>Activities</Text>
            </View>
          </TouchableOpacity>
        </ScrollView>
        <CustomCarousel />
        <Text style={{ fontWeight: "bold", fontSize: 20 }}>
          Recommended Movies
        </Text>
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
                  });
                }}
                style={{
                  height: 250,
                  width: 150,
                  //   borderWidth: 1,
                  overflow: "hidden",
                  marginHorizontal: 10,
                }}
              >
                <View style={{ width: 150, height: 200 }}>
                  <Image
                    source={{ uri: item.imageURL }}
                    style={{ width: "100%", height: "100%", borderRadius: 10 }}
                  />
                </View>
                <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                  {item.movie_name}
                </Text>
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
  iconContainer: {
    margin: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  textStyle: {
    margin: 10,
  },
});
