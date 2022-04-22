import axios from './axios';

const fetchMovies = () => {
  console.log("About to fetch some movies...");
  return axios.get('/movie');
}

const createMovie = (headers, title, year) => {
  console.log('about to create new movie...');
  return axios.post('/movie', { title, year }, headers);
};

export { fetchMovies, createMovie };