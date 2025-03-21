import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Typography, Button, useTheme, useMediaQuery } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { styled } from '@mui/material/styles';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const CarouselContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  marginBottom: theme.spacing(4),
  '& .swiper-pagination-bullet': {
    backgroundColor: theme.palette.common.white,
    opacity: 0.5,
  },
  '& .swiper-pagination-bullet-active': {
    opacity: 1,
    backgroundColor: theme.palette.primary.main,
  },
  '& .swiper-button-next, & .swiper-button-prev': {
    color: theme.palette.primary.main,
    '&:after': {
      fontSize: '24px',
    },
  },
}));

const SlideContent = styled(Box)(({ theme }) => ({
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  padding: theme.spacing(3),
  background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0) 100%)',
  color: theme.palette.common.white,
  textAlign: 'left',
}));

const SlideImage = styled('img')({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
});

const MovieCarousel = ({ title, movies, viewAllLink }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  if (!movies || movies.length === 0) {
    return null;
  }

  return (
    <Box sx={{ mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h5" component="h2" fontWeight="bold">
          {title}
        </Typography>
        {viewAllLink && (
          <Button 
            component={RouterLink} 
            to={viewAllLink} 
            endIcon={<ArrowForwardIcon />}
            color="primary"
          >
            View All
          </Button>
        )}
      </Box>
      
      <CarouselContainer>
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={0}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          style={{ 
            height: isMobile ? '300px' : '500px',
            borderRadius: '12px',
            overflow: 'hidden'
          }}
        >
          {movies.map((movie) => (
            <SwiperSlide key={movie.id}>
              <Box 
                component={RouterLink} 
                to={`/movie/${movie.id}`}
                sx={{ 
                  display: 'block', 
                  height: '100%',
                  textDecoration: 'none',
                  color: 'inherit'
                }}
              >
                <SlideImage 
                  src={`https://image.tmdb.org/t/p/original${movie.backdrop_path || movie.poster_path}`}
                  alt={movie.title}
                />
                <SlideContent>
                  <Typography variant={isMobile ? 'h5' : 'h4'} component="h2" fontWeight="bold" gutterBottom>
                    {movie.title}
                  </Typography>
                  <Typography 
                    variant="body1" 
                    sx={{ 
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      mb: 2,
                      display: { xs: 'none', sm: '-webkit-box' }
                    }}
                  >
                    {movie.overview}
                  </Typography>
                  <Button 
                    variant="contained" 
                    color="primary"
                    size={isMobile ? 'small' : 'medium'}
                  >
                    View Details
                  </Button>
                </SlideContent>
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>
      </CarouselContainer>
    </Box>
  );
};

export default MovieCarousel;