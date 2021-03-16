import React, { useRef } from "react";
import { StyleSheet, Text, View, Image, ScrollView } from "react-native";
import { Button } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import fonts from "../constants/fonts";
import RBSheet from "react-native-raw-bottom-sheet";

const MovieScreen = ({ route, navigation }) => {
  const movies = useSelector((state) => state.Movie.movies);
  const { movie_id } = route.params;
  const refRBSheet = useRef();
  const movie = movies.filter((x) => x.movie_id === movie_id);

  let totalMinutes = movie[0].duration;
  let hrs = Math.trunc(totalMinutes / 60);
  let minutes = totalMinutes % 60;
  let genres = JSON.parse(movie[0].movie_genre);
  let languages = JSON.parse(movie[0].language);
  let cast = JSON.parse(movie[0].cast);

  const getTiming = (timing) => {
    return timing.map((x) => {
      return (
        <View style={{ flexDirection: "row", alignItems: "center" }} key={x}>
          <Button
            onPress={() => {
              refRBSheet.current.close();
              navigation.navigate("AddSeats", {
                time: x,
                movie_id: movie[0].movie_id,
              });
            }}
            key={x}
            style={{ width: 80, marginHorizontal: 10, marginVertical: 5 }}
            mode="outlined"
            color="red"
          >
            {x}
          </Button>
        </View>
      );
    });
  };

  const getCast = () => {
    return cast.map((x) => {
      return (
        <View style={{ alignItems: "center" }} key={x}>
          <Image
            style={{ width: 100, height: 80 }}
            source={{
              uri:
                "https://storage.googleapis.com/opswat-marketing/www.opswat.com/images/icons/user_icon.png",
            }}
          />
          <Text>{x}</Text>
        </View>
      );
    });
  };

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: movie[0].imageURL }}
        style={{ width: "100%", height: 250 }}
      />
      <View style={{ margin: 15 }}>
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>❤️ 90%</Text>
        <Text>
          {languages.map((language) => {
            return ` ${language} `;
          })}
        </Text>
        <Text>
          {hrs} hrs {minutes} minutes{" "}
          <Text style={{ fontSize: 5, justifyContent: "center" }}>⚫</Text>
          {genres.map((genre) => {
            return ` ${genre} `;
          })}
        </Text>
        <Text style={{ fontSize: 24, fontFamily: fonts.Bold }}>
          {movie[0].movie_name}
        </Text>
        <Text style={{ fontSize: 18, fontWeight: "bold", marginTop: 10 }}>
          Description
        </Text>

        <Text>{movie[0].description}</Text>
        <Text style={{ fontSize: 18, fontWeight: "bold", marginTop: 15 }}>
          Cast
        </Text>
        <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
          {getCast()}
        </ScrollView>
      </View>
      <Button
        mode="contained"
        onPress={() => refRBSheet.current.open()}
        contentStyle={{ padding: 5 }}
        color="red"
        style={{ position: "absolute", width: "95%", bottom: 0, margin: 10 }}
      >
        Book tickets
      </Button>
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={false}
        customStyles={{
          wrapper: {
            backgroundColor: "transparent",
          },
          draggableIcon: {
            backgroundColor: "#000",
          },
        }}
      >
        <View style={{ margin: 20 }}>
          <Text
            style={{ fontSize: 20, fontFamily: fonts.Bold, marginBottom: 10 }}
          >
            Select time
          </Text>
          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            {getTiming(movie[0].timing)}
          </View>
        </View>
      </RBSheet>
    </View>
  );
};

export default MovieScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
