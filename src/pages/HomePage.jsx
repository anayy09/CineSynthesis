import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Divider } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import MovieCarousel from '../components/movie/MovieCarousel';
import MovieGrid from '../components/movie/MovieGrid';
import { movieService } from '../services/movieService';

const HomePage = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [newReleases, setNewReleases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        
        // Fetch trending movies for the carousel
        const trendingData = await movieService.getTrendingMovies('week');
        setTrendingMovies(trendingData.results.slice(0, 5));
        
        // Fetch top rated movies
        const topRatedResponse = await movieService.tmdbApi.get('/movie/top_rated');
        setTopRatedMovies(topRatedResponse.data.results);
        
        // Fetch new releases (now playing)
        const newReleasesResponse = await movieService.tmdbApi.get('/movie/now_playing');
        setNewReleases(newReleasesResponse.data.results);
        
        setError(null);
      } catch (err) {
        console.error('Error fetching homepage data:', err);
        setError('Failed to load movie data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  return (
    <>
      <Helmet>
        <title>CineSynthesis - Movie Ratings Aggregator</title>
        <meta name="description" content="Discover movies with aggregated ratings from IMDB, Rotten Tomatoes, Metacritic, and Letterboxd all in one place." />
      </Helmet>
      
      <Box sx={{ pt: 2, pb: 8 }}>
        <Container maxWidth="xl">
          {/* Hero Carousel */}
          {!loading && !error && trendingMovies.length > 0 && (
            <MovieCarousel 
              title="Trending This Week" 
              movies={trendingMovies} 
              viewAllLink="/trending"
            />
          )}
          
          {/* Welcome Message */}
          <Box sx={{ my: 4, textAlign: 'center' }}>
            <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
              Welcome to CineSynthesis
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" sx={{ maxWidth: 800, mx: 'auto' }}>
              Your one-stop destination for movie ratings from across the web. We aggregate scores from IMDB, 
              Rotten Tomatoes, Metacritic, and Letterboxd to give you the most comprehensive view of a movie's reception.
            </Typography>
          </Box>
          
          <Divider sx={{ my: 4 }} />
          
          {/* Top Rated Movies */}
          <MovieGrid 
            title="Top Rated Movies" 
            movies={topRatedMovies} 
            loading={loading} 
            error={error}
            hasMore={true}
            onLoadMore={() => {/* Will implement in next part */}}
          />
          
          {/* New Releases */}
          <MovieGrid 
            title="New Releases" 
            movies={newReleases} 
            loading={loading} 
            error={error}
            hasMore={true}
            onLoadMore={() => {/* Will implement in next part */}}
          />
        </Container>
      </Box>
    </>
  );
};

export default HomePage;