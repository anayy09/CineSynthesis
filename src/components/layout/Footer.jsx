import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Container,
  Grid,
  Link,
  Typography,
  Divider,
  useTheme,
} from '@mui/material';

const Footer = () => {
  const theme = useTheme();
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        py: 6,
        px: 2,
        mt: 'auto',
        backgroundColor: theme.palette.mode === 'light' 
          ? theme.palette.grey[100] 
          : theme.palette.grey[900],
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="space-between">
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              CineSynthesis
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Your one-stop destination for aggregated movie ratings and reviews from across the web.
            </Typography>
          </Grid>
          
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Quick Links
            </Typography>
            <Link component={RouterLink} to="/" color="inherit" display="block" sx={{ mb: 1 }}>
              Home
            </Link>
            <Link component={RouterLink} to="/top-rated" color="inherit" display="block" sx={{ mb: 1 }}>
              Top Rated
            </Link>
            <Link component={RouterLink} to="/new-releases" color="inherit" display="block" sx={{ mb: 1 }}>
              New Releases
            </Link>
          </Grid>
          
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Data Sources
            </Typography>
            <Link href="https://www.imdb.com" target="_blank" rel="noopener" color="inherit" display="block" sx={{ mb: 1 }}>
              IMDB
            </Link>
            <Link href="https://www.rottentomatoes.com" target="_blank" rel="noopener" color="inherit" display="block" sx={{ mb: 1 }}>
              Rotten Tomatoes
            </Link>
            <Link href="https://www.metacritic.com" target="_blank" rel="noopener" color="inherit" display="block" sx={{ mb: 1 }}>
              Metacritic
            </Link>
            <Link href="https://letterboxd.com" target="_blank" rel="noopener" color="inherit" display="block" sx={{ mb: 1 }}>
              Letterboxd
            </Link>
          </Grid>
        </Grid>
        
        <Divider sx={{ mt: 3, mb: 3 }} />
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
          <Typography variant="body2" color="text.secondary">
            © {currentYear} CineSynthesis. All rights reserved.
          </Typography>
          <Box>
            <Link href="#" color="inherit" sx={{ pl: 1 }}>
              Privacy Policy
            </Link>
            <Link href="#" color="inherit" sx={{ pl: 2 }}>
              Terms of Service
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;