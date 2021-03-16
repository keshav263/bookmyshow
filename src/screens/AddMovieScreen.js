import React, { useCallback, useEffect, useState } from "react";
import {
  TextInput,
  RadioButton,
  Checkbox,
  Portal,
  Dialog,
  Button,
} from "react-native-paper";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  ActivityIndicator,
  Platform,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { AntDesign } from "@expo/vector-icons";
import { useForm, Controller } from "react-hook-form";
import * as movieActions from "../store/actions/Movies";

const AddMovieScreen = ({ navigation, route }) => {
  const { movieId, newMovie } = route.params;
  const [isLoading, setIsLoading] = useState(false);

  const token = useSelector((state) => state.Auth.token);
  const dispatch = useDispatch();

  const movie = useSelector((state) =>
    state.Movie.movies.filter((movie) => movie.movie_id === movieId)
  );

  const {
    control,
    handleSubmit,
    errors,
    getValues,
    setValue,
    setError,
  } = useForm();

  let movie_languages, genre, movie_cast, movie_timing;

  if (!newMovie) {
    movie_languages = JSON.parse(movie[0].language);
    movie_languages = movie_languages.join();
    genre = JSON.parse(movie[0].movie_genre);
    genre = genre.join();
    movie_cast = JSON.parse(movie[0].cast);
    movie_cast = movie_cast.join();
    // movie_timing = JSON.parse(movie[0].timing);
    // if (movie_timing) movie_timing = movie_timing.join();
  }

  const [language, setLanguage] = useState(
    movie.length > 0 ? movie_languages : ""
  );

  const [movie_genre, setMovieGenre] = useState(movie.length > 0 ? genre : "");
  const [cast, setCast] = useState(movie.length > 0 ? movie_cast : "");
  // const [timing, setTiming] = useState(movie.length > 0 ? movie_timing : "");

  const [visible, setVisible] = useState(false);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <TouchableOpacity
            style={{ marginRight: 20, paddingRight: 10 }}
            onPress={handleSubmit(onSubmit)}
          >
            <AntDesign name="check" size={24} color="black" />
          </TouchableOpacity>
        );
      },
    });
  });

  const onSubmit = async ({ name, imageURL, duration, description }) => {
    movie_languages = language.split(",");
    genre = movie_genre.split(",");
    movie_cast = cast.split(",");
    // movie_timing = timing.split(",");
    try {
      setIsLoading(true);
      if (!newMovie) {
        await dispatch(
          movieActions.editMovie(
            name,
            imageURL,
            movie_languages,
            genre,
            duration,
            description,
            movie_cast,
            // movie_timing,
            token,
            movieId
          )
        );
      } else {
        await dispatch(
          movieActions.addMovie(
            name,
            imageURL,
            movie_languages,
            genre,
            duration,
            description,
            movie_cast,
            // movie_timing,
            token
          )
        );
      }

      setIsLoading(false);
      navigation.navigate("Admin");
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      return Alert.alert(
        "Something went wrong",
        "Please try again with correct credentials",
        [{ text: "Okay" }]
      );
    }
  };

  if (isLoading) {
    return (
      <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
        <ActivityIndicator size="large" color="green" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Controller
        control={control}
        render={({ onChange, onBlur, value }) => (
          <View style={styles.inputContainer}>
            <TextInput
              style={{ margin: 15 }}
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
              mode="outlined"
              label="Name"
            />
          </View>
        )}
        name="name"
        rules={{
          required: true,
        }}
        defaultValue={movie.length ? movie[0].movie_name : ""}
      />
      {errors.name && (
        <View style={styles.errorMessage}>
          <Text style={{ color: "red", fontWeight: "bold" }}>Wrong!!</Text>
        </View>
      )}
      <Controller
        control={control}
        render={({ onChange, onBlur, value }) => (
          <View style={styles.inputContainer}>
            <TextInput
              style={{ margin: 15 }}
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
              mode="outlined"
              label="Description"
            />
          </View>
        )}
        name="description"
        rules={{
          required: true,
        }}
        defaultValue={movie.length ? movie[0].description : ""}
      />
      {errors.description && (
        <View style={styles.errorMessage}>
          <Text style={{ color: "red", fontWeight: "bold" }}>Wrong!!</Text>
        </View>
      )}

      <Controller
        control={control}
        render={({ onChange, onBlur, value }) => (
          <View style={styles.inputContainer}>
            <TextInput
              style={{ margin: 15 }}
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
              mode="outlined"
              label="image link"
            />
          </View>
        )}
        name="imageURL"
        rules={{
          required: true,
        }}
        defaultValue={movie.length ? movie[0].imageURL : ""}
      />
      {errors.imageURL && (
        <View style={styles.errorMessage}>
          <Text style={{ color: "red", fontWeight: "bold" }}>Wrong!!</Text>
        </View>
      )}
      <Controller
        control={control}
        render={({ onChange, onBlur, value }) => (
          <View style={styles.inputContainer}>
            <TextInput
              style={{ margin: 15 }}
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
              mode="outlined"
              label="Duration of movie"
            />
          </View>
        )}
        name="duration"
        rules={{
          required: true,
        }}
        defaultValue={movie.length ? `${movie[0].duration}` : ""}
      />
      {errors.duration && (
        <View style={styles.errorMessage}>
          <Text style={{ color: "red", fontWeight: "bold" }}>Wrong!!</Text>
        </View>
      )}

      <View style={styles.inputContainer}>
        <TextInput
          style={{ margin: 15 }}
          onChangeText={(value) => setMovieGenre(value)}
          value={movie_genre}
          mode="outlined"
          label="Genres"
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={{ margin: 15 }}
          onChangeText={(value) => setLanguage(value)}
          value={language}
          mode="outlined"
          label="Languages"
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={{ margin: 15 }}
          onChangeText={(value) => setCast(value)}
          value={cast}
          mode="outlined"
          label="Cast"
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonStyle: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginHorizontal: 15,
  },

  errorMessage: {
    color: "red",
    marginHorizontal: 15,
  },
});

export default AddMovieScreen;
