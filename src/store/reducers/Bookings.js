import { LOG_OUT } from "../actions/Auth";
import { BOOKING_DETAILS } from "../actions/Bookings";

const initialState = {
  movie_details: [],
  time: "",
  booking_id: 0,
  seats: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case BOOKING_DETAILS: {
      return {
        movie_details: action.movie_details,
        time: action.time,
        seats: action.seats,
        booking_id: action.booking_id,
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
