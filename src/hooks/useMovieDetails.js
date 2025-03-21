import { useState, useEffect } from 'react';
import { movieService } from '../services/movieService';
import { calculateCineScore } from '../utils/cineScoreCalculator';

const useMovieDetails = (movieId, audienceFocused = false) => {
  const [movie, setMovie] = useState(null);
  const [ratings, setRatings] = useState(null);
  const [cineScore, setCineScore] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setLoading(true);
        
        // Fetch movie details from TMDB
        const movieDetails = await movieService.getMovieDetails(movieId);
        setMovie(movieDetails);
        
        // If we have an IMDB ID, fetch ratings
        if (movieDetails.imdb_id) {
          try {
            // Fetch ratings from OMDB
            const ratingsData = await movieService.getMovieRatings(movieDetails.imdb_id);
            setRatings(ratingsData);
            
            // Calculate CineScore
            const score = calculateCineScore(ratingsData, { audienceFocused });
            setCineScore(score);
          } catch (ratingsError) {
            console.error('Error fetching ratings:', ratingsError);
            // Don't set error state here, as we still have movie details
            // Just set ratings to null
            setRatings(null);
            setCineScore(null);
          }
        }
        
        setError(null);
      } catch (err) {
        console.error('Error fetching movie details:', err);
        setError('Failed to load movie details. Please try again later.');
        setMovie(null);
        setRatings(null);
        setCineScore(null);
      } finally {
        setLoading(false);
      }
    };

    if (movieId) {
      fetchMovieDetails();
    }
  }, [movieId, audienceFocused]);

  return { movie, ratings, cineScore, loading, error };
};

export default useMovieDetails;