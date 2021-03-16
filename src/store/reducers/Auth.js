import { DID_TRY_AUTO_AL, SIGN_UP_DEFAULT, LOG_OUT } from "../actions/Auth";
import AsyncStorage from "@react-native-community/async-storage";

const initialState = {
  oAuth: false,
  token: "",
  didTryAutoLogin: false,
  isAuth: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SIGN_UP_DEFAULT: {
      AsyncStorage.setItem("tokenId", action.authData.token);

      return {
        ...state,
        isAuth: true,
        token: action.authData.token,
        didTryAutoLogin: true,
      };
    }
    case DID_TRY_AUTO_AL: {
      return {
        ...state,
        didTryAutoLogin: true,
      };
    }
    case LOG_OUT: {
      AsyncStorage.removeItem("tokenId");

      return initialState;
    }

    default: {
      return state;
    }
  }
};
