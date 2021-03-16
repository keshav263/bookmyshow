import { LOG_OUT } from "../actions/Auth";
import { EDIT_TIMING, GET_ALL_MOVIES } from "../actions/Movies";

const initialState = {
  movies: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_MOVIES: {
      return {
        movies: action.data,
      };
    }

    case EDIT_TIMING: {
      let editedMovies = state.movies;

      editedMovies = editedMovies.map((movie) => {
        if (movie.movie_id === action.movie_id) {
          movie.timing.push(time);
        }
        return movie;
      });

      return {
        movies: editedMovies,
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
