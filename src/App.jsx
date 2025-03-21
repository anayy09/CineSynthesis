import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';

// Import pages
import HomePage from './pages/HomePage';
import MovieDetailPage from './pages/MovieDetailPage';
import SearchResultsPage from './pages/SearchResultsPage';
import TopRatedPage from './pages/TopRatedPage';
import NewReleasesPage from './pages/NewReleasesPage';
import NotFoundPage from './pages/NotFoundPage';

// Import layout components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ErrorBoundary from './components/ui/ErrorBoundary';
import BackToTopButton from './components/ui/BackToTopButton';

function App() {
  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      minHeight: '100vh' 
    }}>
      <ErrorBoundary>
        <Navbar />
        <Box component="main" sx={{ flexGrow: 1 }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/movie/:id" element={<MovieDetailPage />} />
            <Route path="/search" element={<SearchResultsPage />} />
            <Route path="/top-rated" element={<TopRatedPage />} />
            <Route path="/new-releases" element={<NewReleasesPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Box>
        <Footer />
        <BackToTopButton />
      </ErrorBoundary>
    </Box>
  );
}

export default App;