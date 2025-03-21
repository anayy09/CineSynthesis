import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Grid, FormControl, InputLabel, Select, MenuItem, Divider, ToggleButtonGroup, ToggleButton } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import MovieGrid from '../components/movie/MovieGrid';
import { movieService } from '../services/movieService';

const NewReleasesPage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [genreFilter, setGenreFilter] = useState('');
  const [genres, setGenres] = useState([]);
  const [releaseType, setReleaseType] = useState('now_playing');

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

  // Fetch new releases
  useEffect(() => {
    const fetchNewReleases = async () => {
      try {
        setLoading(true);
        
        let endpoint = `/movie/${releaseType}`;
        const params = { page };
        
        // If genre filter is applied, use discover endpoint instead
        if (genreFilter) {
          endpoint = '/discover/movie';
          params.with_genres = genreFilter;
          
          // Add appropriate date filters based on release type
          const today = new Date();
          
          if (releaseType === 'now_playing') {
            // Last 30 days to today
            const thirtyDaysAgo = new Date();
            thirtyDaysAgo.setDate(today.getDate() - 30);
            params.primary_release_date_gte = thirtyDaysAgo.toISOString().split('T')[0];
            params.primary_release_date_lte = today.toISOString().split('T')[0];
          } else if (releaseType === 'upcoming') {
            // Today to 30 days in future
            const thirtyDaysLater = new Date();
            thirtyDaysLater.setDate(today.getDate() + 30);
            params.primary_release_date_gte = today.toISOString().split('T')[0];
            params.primary_release_date_lte = thirtyDaysLater.toISOString().split('T')[0];
          }
          
          params.sort_by = 'primary_release_date.desc';
        }
        
        // Make API request
        const response = await movieService.tmdbApi.get(endpoint, { params });
        
        if (page === 1) {
          setMovies(response.data.results);
        } else {
          setMovies(prevMovies => [...prevMovies, ...response.data.results]);
        }
        
        // Check if there are more pages
        setHasMore(page < response.data.total_pages);
        setError(null);
      } catch (err) {
        console.error('Error fetching new releases:', err);
        setError('Failed to load new releases. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchNewReleases();
  }, [page, genreFilter, releaseType]);

  // Handle load more
  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  // Handle genre filter change
  const handleGenreChange = (event) => {
    setGenreFilter(event.target.value);
    setPage(1); // Reset to first page when filter changes
  };

  // Handle release type change
  const handleReleaseTypeChange = (event, newValue) => {
    if (newValue !== null) {
      setReleaseType(newValue);
      setPage(1); // Reset to first page when type changes
    }
  };

  return (
    <>
      <Helmet>
        <title>New Releases - CineSynthesis</title>
        <meta name="description" content="Discover the latest movie releases and upcoming films on CineSynthesis." />
      </Helmet>
      
      <Container maxWidth="xl">
        <Box sx={{ py: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            New Releases
          </Typography>
          
          <Typography variant="body1" color="text.secondary" paragraph>
            Stay up to date with the latest movie releases and upcoming films.
          </Typography>
          
          <Grid container spacing={2} alignItems="center" sx={{ mb: 4 }}>
            <Grid item xs={12} sm={6} md={4}>
              <ToggleButtonGroup
                value={releaseType}
                exclusive
                onChange={handleReleaseTypeChange}
                aria-label="release type"
                fullWidth
                size="small"
              >
                <ToggleButton value="now_playing" aria-label="now playing">
                  Now Playing
                </ToggleButton>
                <ToggleButton value="upcoming" aria-label="upcoming">
                  Coming Soon
                </ToggleButton>
              </ToggleButtonGroup>
            </Grid>
            
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

export default NewReleasesPage;