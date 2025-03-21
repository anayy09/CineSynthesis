import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Grid,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Pagination,
  CircularProgress,
  Chip,
  Divider,
} from '@mui/material';
import { Helmet } from 'react-helmet-async';
import MovieGrid from '../components/movie/MovieGrid';
import { movieService } from '../services/movieService';

const SearchResultsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [totalResults, setTotalResults] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('popularity.desc');
  const [yearFilter, setYearFilter] = useState('');

  // Fetch search results
  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!query.trim()) {
        setMovies([]);
        setTotalPages(0);
        setTotalResults(0);
        return;
      }

      try {
        setLoading(true);
        
        // Build search parameters
        const params = {
          query: query.trim(),
          page: currentPage,
          include_adult: false,
        };
        
        // Add year filter if selected
        if (yearFilter) {
          params.primary_release_year = yearFilter;
        }
        
        // Add sort parameter
        if (sortBy) {
          params.sort_by = sortBy;
        }
        
        // Make API request
        const response = await movieService.tmdbApi.get('/search/movie', { params });
        
        setMovies(response.data.results);
        setTotalPages(response.data.total_pages);
        setTotalResults(response.data.total_results);
        setError(null);
      } catch (err) {
        console.error('Error searching movies:', err);
        setError('Failed to load search results. Please try again later.');
        setMovies([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [query, currentPage, sortBy, yearFilter]);

  // Handle page change
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    // Update URL with new page parameter
    searchParams.set('page', value);
    setSearchParams(searchParams);
    // Scroll to top
    window.scrollTo(0, 0);
  };

  // Handle sort change
  const handleSortChange = (event) => {
    setSortBy(event.target.value);
    setCurrentPage(1);
    // Update URL with new sort parameter
    searchParams.set('sort', event.target.value);
    searchParams.delete('page');
    setSearchParams(searchParams);
  };

  // Handle year filter change
  const handleYearChange = (event) => {
    setYearFilter(event.target.value);
    setCurrentPage(1);
    // Update URL with new year parameter
    if (event.target.value) {
      searchParams.set('year', event.target.value);
    } else {
      searchParams.delete('year');
    }
    searchParams.delete('page');
    setSearchParams(searchParams);
  };

  // Generate year options (current year down to 1900)
  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from({ length: currentYear - 1899 }, (_, i) => currentYear - i);

  return (
    <>
      <Helmet>
        <title>{query ? `Search: ${query} - CineSynthesis` : 'Search Movies - CineSynthesis'}</title>
        <meta name="description" content={`Search results for "${query}" on CineSynthesis`} />
      </Helmet>
      
      <Container maxWidth="xl">
        <Box sx={{ py: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Search Results
          </Typography>
          
          {query && (
            <Box sx={{ mb: 3 }}>
              <Chip 
                label={`"${query}"`} 
                color="primary" 
                onDelete={() => {
                  setSearchParams({});
                  window.location.href = '/search';
                }}
              />
              
              {totalResults > 0 && (
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  Found {totalResults.toLocaleString()} results
                </Typography>
              )}
            </Box>
          )}
          
          <Grid container spacing={2} sx={{ mb: 4 }}>
            <Grid item xs={12} sm={6} md={4}>
              <FormControl fullWidth variant="outlined" size="small">
                <InputLabel id="sort-by-label">Sort By</InputLabel>
                <Select
                  labelId="sort-by-label"
                  value={sortBy}
                  onChange={handleSortChange}
                  label="Sort By"
                >
                  <MenuItem value="popularity.desc">Popularity (Descending)</MenuItem>
                  <MenuItem value="popularity.asc">Popularity (Ascending)</MenuItem>
                  <MenuItem value="vote_average.desc">Rating (Descending)</MenuItem>
                  <MenuItem value="vote_average.asc">Rating (Ascending)</MenuItem>
                  <MenuItem value="release_date.desc">Release Date (Descending)</MenuItem>
                  <MenuItem value="release_date.asc">Release Date (Ascending)</MenuItem>
                  <MenuItem value="original_title.asc">Title (A-Z)</MenuItem>
                  <MenuItem value="original_title.desc">Title (Z-A)</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} sm={6} md={4}>
              <FormControl fullWidth variant="outlined" size="small">
                <InputLabel id="year-filter-label">Release Year</InputLabel>
                <Select
                  labelId="year-filter-label"
                  value={yearFilter}
                  onChange={handleYearChange}
                  label="Release Year"
                >
                  <MenuItem value="">All Years</MenuItem>
                  {yearOptions.map(year => (
                    <MenuItem key={year} value={year}>{year}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          
          <Divider sx={{ mb: 4 }} />
          
          {loading && !movies.length ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
              <CircularProgress />
            </Box>
          ) : (
            <>
              <MovieGrid 
                movies={movies} 
                loading={loading} 
                error={error}
              />
              
              {totalPages > 1 && (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, mb: 2 }}>
                  <Pagination 
                    count={totalPages > 500 ? 500 : totalPages} // TMDB API limits to 500 pages
                    page={currentPage}
                    onChange={handlePageChange}
                    color="primary"
                    size="large"
                    showFirstButton
                    showLastButton
                  />
                </Box>
              )}
            </>
          )}
          
          {!loading && !error && movies.length === 0 && (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <Typography variant="h6">
                {query ? 'No movies found matching your search.' : 'Enter a search term to find movies.'}
              </Typography>
              {query && (
                <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
                  Try adjusting your search or filters to find what you're looking for.
                </Typography>
              )}
            </Box>
          )}
        </Box>
      </Container>
    </>
  );
};

export default SearchResultsPage;