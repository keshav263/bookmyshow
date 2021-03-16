import React, { useRef, useState, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import { Button } from "react-native-paper";
import RBSheet from "react-native-raw-bottom-sheet";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as movieActions from "../../store/actions/Movies";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
const TimingItem = ({ item, setIsLoading }) => {
  const refRBSheet = useRef();
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const token = useSelector((state) => state.Auth.token);
  let count = 0;
  const [time, setTime] = useState(new Date());
  const showTimepicker = () => {
    setShow(true);
  };

  const canDeleteTiming = (timing) => {
    return timing.map((x) => {
      return (
        <View style={{ flexDirection: "row", alignItems: "center" }} key={x}>
          <Button
            key={x}
            style={{ width: 80, marginHorizontal: 10, marginVertical: 5 }}
            mode="outlined"
          >
            {x}
          </Button>
          <TouchableOpacity
            onPress={async () => {
              setIsLoading(true);
              await dispatch(
                movieActions.deleteTiming(item.movie_id, x, token)
              );
              setIsLoading(false);
              navigation.navigate("Admin");
            }}
          >
            <Ionicons name="trash-bin" color="black" size={24} />
          </TouchableOpacity>
        </View>
      );
    });
  };

  const getTiming = (timing) => {
    return timing.map((x) => {
      return (
        <View style={{ flexDirection: "row", alignItems: "center" }} key={x}>
          <Button
            key={x}
            style={{ width: 80, marginHorizontal: 10, marginVertical: 5 }}
            mode="outlined"
          >
            {x}
          </Button>
        </View>
      );
    });
  };

  const onChange = async (event, selectedDate) => {
    let x = new Date(event.nativeEvent.timestamp);
    let hrs = x.getHours();
    let mins = x.getMinutes();
    if (mins < 10) {
      mins = `0${mins}`;
    }
    setTime(x);
    setShow(false);
    fetchData(`${hrs}:${mins}`);
  };

  const fetchData = useCallback(
    async (time) => {
      setIsLoading(true);
      await dispatch(movieActions.addTiming(time, item.movie_id, token));

      setIsLoading(false);
      navigation.navigate("Admin");
    },
    [setIsLoading, dispatch]
  );

  return (
    <>
      <TouchableOpacity
        onPress={() => refRBSheet.current.open()}
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginVertical: 15,
        }}
      >
        <Image
          resizeMode="cover"
          style={{ width: 150, height: 150 }}
          source={{ uri: item.imageURL }}
        />
        <View>
          <Text style={{ fontSize: 20, padding: 20, width: 200 }}>
            {item.movie_name}
          </Text>
          <View style={{ flexDirection: "row", flexWrap: "wrap", width: 200 }}>
            {getTiming(item.timing)}
          </View>
        </View>
      </TouchableOpacity>
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
        <View>
          {canDeleteTiming(item.timing)}
          <Button onPress={showTimepicker}>Add new timing</Button>
        </View>
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={time}
            mode={"time"}
            is24Hour={true}
            display="clock"
            onChange={onChange}
          />
        )}
      </RBSheet>
    </>
  );
};

export default TimingItem;

const styles = StyleSheet.create({});
