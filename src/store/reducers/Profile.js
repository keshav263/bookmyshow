import { LOG_OUT, SIGN_UP_DEFAULT } from "../actions/Auth";

const initialState = {
  username: "",
  email_id: "",
  type: "",
  phone_number: "",
  user_id: "",
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SIGN_UP_DEFAULT: {
      return {
        username: action.authData.username,
        phone_number: action.authData.phone_number,
        email_id: action.authData.email_id,
        type: action.authData.type,
        user_id: action.authData.user_id,
      };
    }

    case LOG_OUT: {
      return initialState;
    }

    default: {
      return state;
    }
  }
};
