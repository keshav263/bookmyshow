import React, { useCallback, useState, useRef } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import * as movieActions from "../store/actions/Movies";
import { Button } from "react-native-paper";
import TimingItem from "../components/General/TimingItem";

const AddTimingScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const token = useSelector((state) => state.Auth.token);
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.Movie.movies);
  const fetchData = useCallback(async () => {
    setIsLoading(true);
    await dispatch(movieActions.getAllMovies());
    setIsLoading(false);
  }, [setIsLoading, dispatch]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator color="green" size="large" />
      </View>
    );
  }

  return (
    <View>
      <FlatList
        data={movies}
        keyExtractor={(item) => `${item.movie_id}`}
        ListHeaderComponent={
          <Text style={{ fontSize: 20, fontWeight: "bold", margin: 15 }}>
            Select a movie to change its timing
          </Text>
        }
        ListFooterComponent={<View style={{ height: 100 }}></View>}
        renderItem={({ item }) => {
          return <TimingItem item={item} setIsLoading={setIsLoading} />;
        }}
      />
    </View>
  );
};
export default AddTimingScreen;

const styles = StyleSheet.create({});
