import { LOG_OUT } from "../actions/Auth";
import { BOOKED_SEATS, BOOKING_DETAILS } from "../actions/Bookings";

const initialState = {
  bookedSeats:[],
  movie_details: [],
  time: "",
  booking_id: 0,
  seats: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case BOOKING_DETAILS: {
      return {
        ...state,
        movie_details: action.movie_details,
        time: action.time,
        seats: action.seats,
        booking_id: action.booking_id,
      };
    }
    case BOOKED_SEATS:{
      return {
        ...state,
        bookedSeats:action.payload
      }
    }
    case LOG_OUT: {
      return initialState;
    }
    default: {
      return state;
    }
  }
};
