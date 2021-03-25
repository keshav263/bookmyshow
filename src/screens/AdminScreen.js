import React, { useCallback, useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { Button, FAB, Provider, Portal } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import * as movieActions from "../store/actions/Movies";
import MovieItem from "../components/General/MovieItem";
const AdminScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const token = useSelector((state) => state.Auth.token);

  const movies = useSelector((state) => state.Movie.movies);
  const fetchData = useCallback(async () => {
    setIsLoading(true);
    await dispatch(movieActions.getAllMovies());
    setIsLoading(false);
  }, [setIsLoading, dispatch]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", fetchData);
    fetchData();
    return () => {
      unsubscribe();
    };
  }, []);

  const [state, setState] = React.useState({ open: false });

  const onStateChange = ({ open }) => setState({ open });

  const { open } = state;

  if (isLoading) {
    return (
      <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
        <ActivityIndicator size="large" color="green" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* <FAB
        style={styles.timing}
        small
        icon="pencil"
        onPress={() => navigation.navigate("AddTiming")}
      /> */}
      <FAB
        style={styles.fab}
        small={false}
        icon="plus"
        onPress={() => {
          navigation.navigate("AddMovie", {
            movieId: "",
            newMovie: true,
          });
        }}
      />

      <FlatList
        data={movies}
        keyExtractor={(item) => `${item.movie_id}`}
        renderItem={({ item }) => {
          let movie_languages = JSON.parse(item.language);
          movie_languages = movie_languages.join();
          let genre = JSON.parse(item.movie_genre);
          genre = genre.join();
          let movie_cast = JSON.parse(item.cast);
          movie_cast = movie_cast.join();
          // let movie_timing = JSON.parse(item.timing);
          // if (movie_timing) movie_timing = movie_timing.join();
          return (
            <MovieItem
              name={item.movie_name}
              cast={movie_cast}
              description={item.description}
              duration={item.duration}
              genre={genre}
              imageURL={item.imageURL}
              language={movie_languages}
              timing={item.timing}
              _id={item.movie_id}
              fetchData={fetchData}
              setIsLoading={setIsLoading}
            />
          );
        }}
      />
    </View>
  );
};

export default AdminScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
    zIndex: 10000,
  },
  timing: {
    position: "absolute",
    margin: 16,
    right: 5,
    bottom: 70,
    zIndex: 10000,
  },
});
