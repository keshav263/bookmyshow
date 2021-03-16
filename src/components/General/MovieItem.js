import React, { useEffect, useState } from "react";
import { Image } from "react-native";
import { View, Text, Alert } from "react-native";
import { Button, Card, Title, Paragraph, Divider } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import * as movieActions from "../../store/actions/Movies";
import { useSelector, useDispatch } from "react-redux";

const MovieItem = ({
  name,

  imageURL,
  _id,
  genre,
  cast,
  description,
  language,
  duration,
  timing,
  setIsLoading,
  fetchData,
}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const token = useSelector((state) => state.Auth.token);
  const tryingToDeleteItemAlert = () => {
    return Alert.alert(
      `Are you sure you want to delete ${name}?`,
      "Press confirm to continue",
      [
        {
          text: "Yes",
          onPress: async () => {
            try {
              setIsLoading(true);
              await dispatch(movieActions.removeMovie(token, _id));
              setIsLoading(false);
              fetchData();
            } catch (error) {
              setIsLoading(false);
              return Alert.alert("Something went wrong", "Please try again", [
                { text: "OKay" },
              ]);
            }
          },
        },
        { text: "No" },
      ]
    );
  };

  let totalMinutes = duration;
  let hrs = Math.trunc(totalMinutes / 60);
  let minutes = totalMinutes % 60;

  const getTiming = () => {
    if (timing) {
      return timing.map((x) => {
        return (
          <Button
            key={x}
            style={{ width: 100, marginHorizontal: 10, marginVertical: 5 }}
            mode="outlined"
          >
            {x}
          </Button>
        );
      });
    }
  };

  return (
    <Card style={{ marginVertical: 5 }}>
      <Card.Cover
        resizeMode="contain"
        source={{
          uri: imageURL
            ? imageURL
            : "https://th.bing.com/th/id/OIP.ouOFcEHOYh7Dj3JCmDUfhwAAAA?pid=Api&rs=1",
          cache: "reload",
        }}
      />
      <Card.Title title={name} subtitle={genre} />
      <Divider />
      <Card.Content>
        <Text style={{ fontStyle: "italic", marginBottom: 10 }}>
          {hrs} hrs {minutes} minutes{" "}
        </Text>
        <Text style={{ marginBottom: 10 }}>Available in {language}</Text>

        <Paragraph numberOfLines={3}>{description}</Paragraph>
        <Paragraph numberOfLines={3} style={{ fontWeight: "bold" }}>
          {cast}
        </Paragraph>
      </Card.Content>
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          margin: 15,
        }}
      >
        {getTiming()}
      </View>

      <Card.Actions>
        <Button
          onPress={() => navigation.navigate("AddMovie", { movieId: _id })}
        >
          Edit
        </Button>
        <Button color="red" onPress={() => tryingToDeleteItemAlert()}>
          DELETE
        </Button>
      </Card.Actions>
    </Card>
  );
};

export default MovieItem;
