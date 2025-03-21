import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Chip,
  Rating,
} from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: theme.shadows[8],
  },
}));

const StyledCardMedia = styled(CardMedia)({
  height: 0,
  paddingTop: '150%', // 2:3 aspect ratio for movie posters
  position: 'relative',
});

const RatingBadge = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 10,
  right: 10,
  backgroundColor: 'rgba(0, 0, 0, 0.7)',
  color: '#fff',
  borderRadius: '50%',
  width: 50,
  height: 50,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontWeight: 'bold',
  zIndex: 1,
    [theme.breakpoints.down('sm')]: {
        width: 40,
        height: 40,
        fontSize: '0.9rem',
    },
}));

const MovieCard = ({ movie }) => {
  // Format release date to year only
  const releaseYear = movie.release_date ? new Date(movie.release_date).getFullYear() : '';
  
  // Get poster URL or use placeholder
  const posterUrl = movie.poster_path 
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://via.placeholder.com/500x750?text=No+Poster';

  // Calculate CineScore (placeholder for now)
  const cineScore = movie.vote_average ? (movie.vote_average / 2).toFixed(1) : '?';

  return (
    <StyledCard>
      <CardActionArea component={RouterLink} to={`/movie/${movie.id}`} sx={{ flexGrow: 1 }}>
        <StyledCardMedia
          image={posterUrl}
          title={movie.title}
        >
          <RatingBadge>
            {cineScore}
          </RatingBadge>
        </StyledCardMedia>
        <CardContent>
          <Typography gutterBottom variant="h6" component="div" noWrap>
            {movie.title}
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
            <Typography variant="body2" color="text.secondary">
              {releaseYear}
            </Typography>
            <Rating 
              value={movie.vote_average / 2} 
              precision={0.5} 
              size="small" 
              readOnly 
            />
          </Box>
          {movie.genre_ids && movie.genre_ids.length > 0 && (
            <Box sx={{ mt: 1 }}>
              <Chip 
                label={getGenreName(movie.genre_ids[0])} 
                size="small" 
                sx={{ mr: 0.5, mb: 0.5 }} 
              />
            </Box>
          )}
        </CardContent>
      </CardActionArea>
    </StyledCard>
  );
};

// Helper function to get genre name from ID (simplified version)
const getGenreName = (genreId) => {
  const genres = {
    28: 'Action',
    12: 'Adventure',
    16: 'Animation',
    35: 'Comedy',
    80: 'Crime',
    99: 'Documentary',
    18: 'Drama',
    10751: 'Family',
    14: 'Fantasy',
    36: 'History',
    27: 'Horror',
    10402: 'Music',
    9648: 'Mystery',
    10749: 'Romance',
    878: 'Sci-Fi',
    10770: 'TV Movie',
    53: 'Thriller',
    10752: 'War',
    37: 'Western'
  };
  
  return genres[genreId] || 'Unknown';
};

export default MovieCard;