import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Grid, FormControl, InputLabel, Select, MenuItem, Divider } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import MovieGrid from '../components/movie/MovieGrid';
import { movieService } from '../services/movieService';

const TopRatedPage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [genreFilter, setGenreFilter] = useState('');
  const [genres, setGenres] = useState([]);

  // Fetch genres once on component mount
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await movieService.tmdbApi.get('/genre/movie/list');
        setGenres(response.data.genres);
      } catch (err) {
        console.error('Error fetching genres:', err);
      }
    };

    fetchGenres();
  }, []);

  // Fetch top rated movies
  useEffect(() => {
    const fetchTopRatedMovies = async () => {
      try {
        setLoading(true);
        
        // Build parameters
        const params = {
          page,
          sort_by: 'vote_average.desc',
          'vote_count.gte': 1000, // Minimum vote count for reliability
        };
        
        // Add genre filter if selected
        if (genreFilter) {
          params.with_genres = genreFilter;
        }
        
        // Make API request
        const response = await movieService.tmdbApi.get('/discover/movie', { params });
        
        if (page === 1) {
          setMovies(response.data.results);
        } else {
          setMovies(prevMovies => [...prevMovies, ...response.data.results]);
        }
        
        // Check if there are more pages
        setHasMore(page < response.data.total_pages);
        setError(null);
      } catch (err) {
        console.error('Error fetching top rated movies:', err);
        setError('Failed to load top rated movies. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchTopRatedMovies();
  }, [page, genreFilter]);

  // Handle load more
  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  // Handle genre filter change
  const handleGenreChange = (event) => {
    setGenreFilter(event.target.value);
    setPage(1); // Reset to first page when filter changes
  };

  return (
    <>
      <Helmet>
        <title>Top Rated Movies - CineSynthesis</title>
        <meta name="description" content="Discover the highest-rated movies of all time on CineSynthesis." />
      </Helmet>
      
      <Container maxWidth="xl">
        <Box sx={{ py: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Top Rated Movies
          </Typography>
          
          <Typography variant="body1" color="text.secondary" paragraph>
            Discover the highest-rated movies of all time, based on millions of votes from movie fans around the world.
          </Typography>
          
          <Grid container spacing={2} sx={{ mb: 4 }}>
            <Grid item xs={12} sm={6} md={4}>
              <FormControl fullWidth variant="outlined" size="small">
                <InputLabel id="genre-filter-label">Filter by Genre</InputLabel>
                <Select
                  labelId="genre-filter-label"
                  value={genreFilter}
                  onChange={handleGenreChange}
                  label="Filter by Genre"
                >
                  <MenuItem value="">All Genres</MenuItem>
                  {genres.map(genre => (
                    <MenuItem key={genre.id} value={genre.id}>{genre.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          
          <Divider sx={{ mb: 4 }} />
          
          <MovieGrid 
            movies={movies} 
            loading={loading} 
            error={error}
            onLoadMore={handleLoadMore}
            hasMore={hasMore}
          />
        </Box>
      </Container>
    </>
  );
};

export default TopRatedPage;