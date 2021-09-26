import axios from 'axios';

const KEY = '93ab5af0b6f3bcde1224ca161062db06';
const BASE_URL = 'https://api.themoviedb.org/';

export default function fetchMovies(url) {
  return axios.get(url).then(response => {
    return response.data;
  });
}

export function fetchPopularMoviesOfTheDay() {
  return fetchMovies(`${BASE_URL}3/trending/movie/day?api_key=${KEY}`);
}

export function fetchSearchMovieByQuery(query) {
  return fetchMovies(
    `${BASE_URL}3/search/movie?api_key=${KEY}&query=${query}&page=1&`,
  );
}

export function fetchMovie(movieId) {
  return fetchMovies(`${BASE_URL}/3/movie/${movieId}?api_key=${KEY}`);
}

export function fetchMovieActors(movieId) {
  return fetchMovies(`${BASE_URL}/3/movie/${movieId}/credits?api_key=${KEY}`);
}

export function fetchMovieReviews(movieId) {
  return fetchMovies(
    `${BASE_URL}/3/movie/${movieId}/reviews?api_key=${KEY}&page=1`,
  );
}
