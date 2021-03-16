import { url } from "../../constants/url";
export const GET_ALL_MOVIES = "GET_ALL_MOVIES";
export const EDIT_TIMING = "EDIT_TIMING";

export const getAllMovies = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${url}/movie/getAllmovies`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status != 200) {
        throw new Error();
      }
      const responseJson = await response.json();
      console.log(responseJson);
      dispatch({
        type: GET_ALL_MOVIES,
        data: responseJson,
      });
    } catch (error) {
      console.log(error);
      throw new Error();
    }
  };
};

export const addTiming = (time, movie_id, token) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${url}/timing/addNewTiming`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
        body: JSON.stringify({
          time,
          movie_id,
        }),
      });
      if (response.status != 200) {
        throw new Error();
      }
      const responseJson = await response.json();
      console.log(responseJson);
      dispatch({
        type: EDIT_TIMING,
        time: time,
        movie_id: movie_id,
      });
    } catch (error) {}
  };
};

export const deleteTiming = (movie_id, time, token) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${url}/timing/removeTiming`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
        body: JSON.stringify({
          time,
          movie_id,
        }),
      });
      if (response.status != 200) {
        throw new Error();
      }
      const responseJson = await response.json();
      console.log(responseJson);
    } catch (error) {}
  };
};

export const addMovie = (
  movie_name,
  imageURL,
  language,
  movie_genre,
  duration,
  description,
  cast,
  // timing,
  token
) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${url}/movie/addNewMovie`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
        body: JSON.stringify({
          movie_name,
          imageURL,
          language,
          movie_genre,
          duration,
          description,
          cast,
          // timing,
        }),
      });
      if (response.status != 200) {
        throw new Error();
      }
      const responseJson = await response.json();
      console.log(responseJson);
      dispatch({
        type: GET_ALL_MOVIES,
        data: responseJson,
      });
    } catch (error) {}
  };
};

export const editMovie = (
  movie_name,
  imageURL,
  language,
  movie_genre,
  duration,
  description,
  cast,
  // timing,
  token,
  movie_id
) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${url}/movie/editMovie`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
        body: JSON.stringify({
          movie_name,
          imageURL,
          language,
          movie_genre,
          duration,
          description,
          cast,
          // timing,
          movie_id,
        }),
      });
      if (response.status != 200) {
        throw new Error();
      }
      const responseJson = await response.json();
      console.log(responseJson);
      dispatch({
        type: GET_ALL_MOVIES,
        data: responseJson,
      });
    } catch (error) {}
  };
};

export const removeMovie = (token, movie_id) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${url}/movie/removeMovie`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
        body: JSON.stringify({
          movie_id,
        }),
      });
      if (response.status != 200) {
        throw new Error();
      }
      const responseJson = await response.json();
      console.log(responseJson);
      dispatch({
        type: GET_ALL_MOVIES,
        data: responseJson,
      });
    } catch (error) {}
  };
};
