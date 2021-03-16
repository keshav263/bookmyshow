import React, { useState } from "react";
import { AppRegistry } from "react-native";
import { name as appName } from "./app.json";
import { Provider as PaperProvider } from "react-native-paper";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";
import AuthReducer from "./src/store/reducers/Auth";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import MovieReducer from "./src/store/reducers/Movies";
import ProfileReducer from "./src/store/reducers/Profile";
import BookingsReducer from "./src/store/reducers/Bookings";
import AppNavigator from "./src/navigator/AppNavigator";
const rootReducer = combineReducers({
  Auth: AuthReducer,
  Movie: MovieReducer,
  Profile: ProfileReducer,
  Bookings: BookingsReducer,
});

const fetchFonts = () => {
  return Font.loadAsync({
    logo: require("./assets/fonts/Yellowtail-Regular.ttf"),
    "Oswald-Regular": require("./assets/fonts/Oswald-Regular.ttf"),
    "Oswald-Medium": require("./assets/fonts/Oswald-Medium.ttf"),
    "Oswald-Light": require("./assets/fonts/Oswald-Light.ttf"),
  });
};

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));
export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onError={console.warn}
        onFinish={() => {
          setFontLoaded(true);
        }}
      />
    );
  }
  return (
    <Provider store={store}>
      <PaperProvider>
        <AppNavigator />
      </PaperProvider>
    </Provider>
  );
}

AppRegistry.registerComponent(appName, () => Main);
