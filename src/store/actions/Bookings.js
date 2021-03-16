import { url } from "../../constants/url";
export const BOOKING_DETAILS = "BOOKING_DETAILS";

export const bookSeats = (seats, time, movie_id, token) => {
  return async (dispatch) => {
    const response = await fetch(`${url}/bookings/bookTickets`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
      body: JSON.stringify({
        seats,
        time,
        movie_id,
      }),
    });
    const responseJson = await response.json();

    console.log(responseJson);
  };
};

export const getCurrentBooking = (token) => {
  return async (dispatch) => {
    const response = await fetch(`${url}/bookings/getCurrentBookingsOfUser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
    });
    const responseJson = await response.json();

    console.log(responseJson);

    dispatch({
      type: BOOKING_DETAILS,

      movie_details: responseJson.movie_details,
      time: responseJson.time,
      seats: responseJson.seats,
      booking_id: responseJson.booking_id,
    });
  };
};
