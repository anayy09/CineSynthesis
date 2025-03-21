import React from 'react';
import { Grid, Typography, Box, Button } from '@mui/material';
import MovieCard from './MovieCard';
import MovieCardSkeleton from './MovieCardSkeleton';
import ErrorDisplay from '../ui/ErrorDisplay';

const MovieGrid = ({ 
  title, 
  movies, 
  loading = false, 
  error = null, 
  onLoadMore = null, 
  hasMore = false,
  onRetry = null
}) => {
  if (error) {
    return <ErrorDisplay message={error} onRetry={onRetry} />;
  }

  const renderSkeletons = () => {
    return Array(6).fill(0).map((_, index) => (
      <Grid item key={`skeleton-${index}`} xs={6} sm={4} md={3} lg={2.4}>
        <MovieCardSkeleton />
      </Grid>
    ));
  };

  return (
    <Box sx={{ mb: 6 }}>
      {title && (
        <Typography variant="h5" component="h2" fontWeight="bold" sx={{ mb: 3 }}>
          {title}
        </Typography>
      )}
      
      <Grid container spacing={3}>
        {movies && movies.map((movie) => (
          <Grid item key={movie.id} xs={6} sm={4} md={3} lg={2.4}>
            <MovieCard movie={movie} />
          </Grid>
        ))}
        
        {loading && renderSkeletons()}
      </Grid>
      
      {!loading && movies && movies.length === 0 && !error && (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography>No movies found.</Typography>
        </Box>
      )}
      
      {onLoadMore && hasMore && (
        <Box sx={{ textAlign: 'center', mt: 3 }}>
          <Button 
            variant="outlined" 
            color="primary" 
            onClick={onLoadMore}
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Load More'}
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default MovieGrid;