import axios from 'axios';

// TMDB API configuration
const tmdbApi = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: import.meta.env.VITE_TMDB_API_KEY,
  },
});

// OMDB API configuration
const omdbApi = axios.create({
  baseURL: 'https://www.omdbapi.com',
  params: {
    apikey: import.meta.env.VITE_OMDB_API_KEY,
  },
});

export { tmdbApi, omdbApi };