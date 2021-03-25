import { url } from "../../constants/url";
export const BOOKING_DETAILS = "BOOKING_DETAILS";
export const BOOKED_SEATS="BOOKED_SEATS";

export const getAllBookedSeats=(token)=>{
  return async (dispatch) => {
    const response = await fetch(`${url}/bookings/getAllBookedSeats`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
    });
    const responseJson = await response.json();
    console.log(responseJson)

    dispatch({type:BOOKED_SEATS,payload:responseJson.result})
  }
}

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
    const responseX=await fetch(`${url}/bookings/getBookingThroughBookingId`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
      body:JSON.stringify({
        booking_id:responseJson.booking_id
      })
    });
    const responseXJson = await responseX.json();

    console.log(responseXJson);
     dispatch({
      type: BOOKING_DETAILS,

      movie_details: responseXJson.movie_details,
      time: responseXJson.time,
      seats: responseXJson.seats,
      booking_id: responseXJson.booking_id,
    });
  };
};

export const getBookingThroughBookingId=(booking_id,token)=>{
  return async(dispatch)=>{
    const response=await fetch(`${url}/bookings/getBookingThroughBookingId`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
      body:JSON.stringify({
        booking_id
      })
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
  }
}

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
