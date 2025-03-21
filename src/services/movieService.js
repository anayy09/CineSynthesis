import { tmdbApi, omdbApi } from './api';

export const movieService = {
  // TMDB API for direct access
  tmdbApi,
  
  // Get trending movies
  getTrendingMovies: async (timeWindow = 'week', page = 1) => {
    try {
      const response = await tmdbApi.get(`/trending/movie/${timeWindow}`, {
        params: { page },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching trending movies:', error);
      throw error;
    }
  },

  // Get movie details from TMDB
  getMovieDetails: async (movieId) => {
    try {
      const response = await tmdbApi.get(`/movie/${movieId}`, {
        params: {
          append_to_response: 'credits,videos,images',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching movie details:', error);
      throw error;
    }
  },

  // Search movies
  searchMovies: async (query, page = 1, options = {}) => {
    try {
      const params = {
        query,
        page,
        include_adult: false,
        ...options
      };
      
      const response = await tmdbApi.get('/search/movie', { params });
      return response.data;
    } catch (error) {
      console.error('Error searching movies:', error);
      throw error;
    }
  },

  // Get movie ratings from OMDB
  getMovieRatings: async (imdbId) => {
    try {
      const response = await omdbApi.get('/', {
        params: { i: imdbId, plot: 'full' },
      });
      
      // Format the response to match our expected structure
      if (response.data && response.data.Response === "True") {
        const ratings = {
          imdb: {
            rating: response.data.imdbRating,
            votes: response.data.imdbVotes,
            url: `https://www.imdb.com/title/${imdbId}`
          }
        };
        
        // Process Rotten Tomatoes rating if available
        const rtRating = response.data.Ratings?.find(r => r.Source === "Rotten Tomatoes");
        if (rtRating) {
          ratings.rottenTomatoes = {
            tomatometer: rtRating.Value.replace('%', ''),
            url: `https://www.rottentomatoes.com/m/${response.data.Title.toLowerCase().replace(/[^a-z0-9]+/g, '_')}`
          };
        }
        
        // Process Metacritic rating if available
        const mcRating = response.data.Ratings?.find(r => r.Source === "Metacritic");
        if (mcRating) {
          ratings.metacritic = {
            metascore: mcRating.Value.replace('/100', ''),
            url: `https://www.metacritic.com/movie/${response.data.Title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`
          };
        }
        
        return ratings;
      }
      
      throw new Error("No ratings data available");
    } catch (error) {
      console.error('Error fetching movie ratings:', error);
      throw error;
    }
  },

  // Get additional movie info from OMDB
  getOmdbMovieInfo: async (imdbId) => {
    try {
      const response = await omdbApi.get('/', {
        params: { i: imdbId, plot: 'full' },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching OMDB movie info:', error);
      throw error;
    }
  },

  // Get movies by genre
  getMoviesByGenre: async (genreId, page = 1) => {
    try {
      const response = await tmdbApi.get('/discover/movie', {
        params: {
          with_genres: genreId,
          page,
          sort_by: 'popularity.desc',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching movies by genre:', error);
      throw error;
    }
  },
};