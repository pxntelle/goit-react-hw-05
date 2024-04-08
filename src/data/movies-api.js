import axios from "axios";

axios.defaults.baseURL = "https://api.themoviedb.org/3";

// const options = {
//   headers: {
//     Authorization: `Bearer ${eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMjFiNTEwOTI0NTE2OTM0YjM1ZjQ5YWY2NTY0Zjg3NCIsInN1YiI6IjY2MGViMDhkZGE5ZWYyMDE3ZDU5NmRkMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.JLT5FwZx_YPaSJDggXA8PCYkmne6Uaap78jG3vzMq54}`,
//   },
// };

// не працює

const options = {
  headers: {
    Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMjFiNTEwOTI0NTE2OTM0YjM1ZjQ5YWY2NTY0Zjg3NCIsInN1YiI6IjY2MGViMDhkZGE5ZWYyMDE3ZDU5NmRkMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.JLT5FwZx_YPaSJDggXA8PCYkmne6Uaap78jG3vzMq54`,
  },
};

export const getTrendingMovies = async () => {
  const { data } = await axios.get(
    `trending/movie/day?language=en-US`,
    options
  );
  return data.results;
};

export const getMoviesByQuery = async (query) => {
  const { data } = await axios.get(
    `search/movie?query=${query}&include_adult=false&language=en-US&page=1`,
    options
  );
  return data.results;
};

export const getMovieById = async (movieId) => {
  const { data } = await axios.get(`movie/${movieId}?language=en-US`, options);
  return data;
};

export const getCast = async (movieId) => {
  const { data } = await axios.get(
    `movie/${movieId}/credits?language=en-US`,
    options
  );
  return data.cast;
};

export const getReview = async (movieId) => {
  const { data } = await axios.get(
    `movie/${movieId}/reviews?language=en-US&page=1`,
    options
  );
  return data.results;
};
