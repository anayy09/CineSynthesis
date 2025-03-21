import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Grid,
  Typography,
  Box,
  Chip,
  Divider,
  Paper,
  Button,
  Rating,
  CircularProgress,
} from "@mui/material";
import { Helmet } from "react-helmet-async";
import useMovieDetails from "../hooks/useMovieDetails";
import RatingCard from "../components/movie/RatingCard";
import CineScoreCard from "../components/movie/CineScoreCard";
import MovieGrid from "../components/movie/MovieGrid";
import { styled } from "@mui/material/styles";

// Styled components
const BackdropContainer = styled(Box)(({ theme, backdropUrl }) => ({
  position: "relative",
  height: "500px",
  backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.1), ${theme.palette.background.default}), url(${backdropUrl})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  marginBottom: theme.spacing(4),
  [theme.breakpoints.down("md")]: {
    height: "300px",
  },
}));

const PosterImage = styled("img")({
  width: "100%",
  borderRadius: "8px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
});

const MovieDetailPage = () => {
  const { id } = useParams();
  const [audienceFocused, setAudienceFocused] = useState(false);

  const { movie, ratings, cineScore, loading, error } = useMovieDetails(
    id,
    audienceFocused
  );

  // Toggle between audience and critic focused scores
  const handleToggleAudienceFocus = () => {
    setAudienceFocused(!audienceFocused);
  };

  // Format runtime to hours and minutes
  const formatRuntime = (minutes) => {
    if (!minutes) return "Unknown";
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  // Get director name
  const getDirector = () => {
    if (!movie || !movie.credits || !movie.credits.crew) return "Unknown";
    const director = movie.credits.crew.find(
      (person) => person.job === "Director"
    );
    return director ? director.name : "Unknown";
  };

  // Loading state
  if (loading) {
    return (
      <Container maxWidth="xl">
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "60vh",
          }}
        >
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  // Error state
  if (error || !movie) {
    return (
      <Container maxWidth="xl">
        <Box sx={{ py: 4, textAlign: "center" }}>
          <Typography variant="h5" color="error" gutterBottom>
            Error Loading Movie
          </Typography>
          <Typography>
            {error || "Failed to load movie details. Please try again later."}
          </Typography>
        </Box>
      </Container>
    );
  }

  // Get backdrop URL
  const backdropUrl = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : null;

  // Get poster URL
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://via.placeholder.com/500x750?text=No+Poster";

  return (
    <>
      <Helmet>
        <title>{`${movie.title} (${
          movie.release_date?.substring(0, 4) || "N/A"
        }) - CineSynthesis`}</title>
        <meta
          name="description"
          content={movie.overview || `Details and ratings for ${movie.title}`}
        />
      </Helmet>

      {/* Backdrop Image */}
      {backdropUrl && <BackdropContainer backdropUrl={backdropUrl} />}

      <Container maxWidth="xl">
        <Grid container spacing={4}>
          {/* Movie Poster and Info */}
          <Grid item xs={12} md={3}>
            <PosterImage src={posterUrl} alt={movie.title} />

            <Paper sx={{ mt: 3, p: 2 }}>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                Movie Info
              </Typography>
              <Divider sx={{ mb: 2 }} />

              <Box sx={{ mb: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  Release Date
                </Typography>
                <Typography variant="body1">
                  {movie.release_date
                    ? new Date(movie.release_date).toLocaleDateString()
                    : "Unknown"}
                </Typography>
              </Box>

              <Box sx={{ mb: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  Runtime
                </Typography>
                <Typography variant="body1">
                  {formatRuntime(movie.runtime)}
                </Typography>
              </Box>

              <Box sx={{ mb: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  Director
                </Typography>
                <Typography variant="body1">{getDirector()}</Typography>
              </Box>

              {movie.budget > 0 && (
                <Box sx={{ mb: 1 }}>
                  <Typography variant="body2" color="text.secondary">
                    Budget
                  </Typography>
                  <Typography variant="body1">
                    ${movie.budget.toLocaleString()}
                  </Typography>
                </Box>
              )}

              {movie.revenue > 0 && (
                <Box sx={{ mb: 1 }}>
                  <Typography variant="body2" color="text.secondary">
                    Revenue
                  </Typography>
                  <Typography variant="body1">
                    ${movie.revenue.toLocaleString()}
                  </Typography>
                </Box>
              )}

              <Box sx={{ mb: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  Original Language
                </Typography>
                <Typography variant="body1">
                  {movie.original_language?.toUpperCase() || "Unknown"}
                </Typography>
              </Box>
            </Paper>
          </Grid>

          {/* Movie Details */}
          <Grid item xs={12} md={9}>
            <Box sx={{ mb: 4 }}>
              <Typography
                variant="h3"
                component="h1"
                gutterBottom
                fontWeight="bold"
              >
                {movie.title}{" "}
                {movie.release_date &&
                  `(${movie.release_date.substring(0, 4)})`}
              </Typography>

              {movie.tagline && (
                <Typography
                  variant="h6"
                  color="text.secondary"
                  gutterBottom
                  sx={{ fontStyle: "italic" }}
                >
                  {movie.tagline}
                </Typography>
              )}

              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 3 }}>
                {movie.genres?.map((genre) => (
                  <Chip
                    key={genre.id}
                    label={genre.name}
                    variant="outlined"
                    size="small"
                  />
                ))}
              </Box>

              <Typography variant="body1" paragraph>
                {movie.overview}
              </Typography>

              {movie.vote_average > 0 && (
                <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                  <Rating
                    value={movie.vote_average / 2}
                    precision={0.5}
                    readOnly
                  />
                  <Typography variant="body2" sx={{ ml: 1 }}>
                    {movie.vote_average.toFixed(1)}/10 (
                    {movie.vote_count.toLocaleString()} votes)
                  </Typography>
                </Box>
              )}
            </Box>

            {/* Ratings Section */}
            <Typography
              variant="h5"
              component="h2"
              gutterBottom
              fontWeight="bold"
            >
              Ratings
            </Typography>
            <Divider sx={{ mb: 3 }} />

            <Grid container spacing={3} sx={{ mb: 4 }}>
              {/* CineScore */}
              <Grid item xs={12} sm={6} md={4}>
                <CineScoreCard
                  cineScore={cineScore}
                  onToggleAudienceFocus={handleToggleAudienceFocus}
                  audienceFocused={audienceFocused}
                  loading={loading}
                />
              </Grid>

              {/* IMDB */}
              <Grid item xs={12} sm={6} md={4}>
                <RatingCard
                  title="IMDB"
                  score={
                    ratings?.imdb?.rating
                      ? parseFloat(ratings.imdb.rating)
                      : null
                  }
                  reviewCount={
                    ratings?.imdb?.votes
                      ? parseInt(ratings.imdb.votes.replace(/,/g, ""))
                      : null
                  }
                  link={
                    ratings?.imdb?.url ||
                    `https://www.imdb.com/title/${movie.imdb_id}`
                  }
                  loading={loading}
                />
              </Grid>

              {/* Rotten Tomatoes */}
              {ratings?.rottenTomatoes && (
                <Grid item xs={12} sm={6} md={4}>
                  <RatingCard
                    title="Rotten Tomatoes"
                    score={
                      ratings?.rottenTomatoes?.tomatometer
                        ? parseFloat(ratings.rottenTomatoes.tomatometer)
                        : null
                    }
                    maxScore={100}
                    link={ratings?.rottenTomatoes?.url}
                    loading={loading}
                  />
                </Grid>
              )}

              {/* Metacritic */}
              {ratings?.metacritic && (
                <Grid item xs={12} sm={6} md={4}>
                  <RatingCard
                    title="Metacritic"
                    score={
                      ratings?.metacritic?.metascore
                        ? parseFloat(ratings.metacritic.metascore)
                        : null
                    }
                    maxScore={100}
                    link={ratings?.metacritic?.url}
                    loading={loading}
                  />
                </Grid>
              )}
            </Grid>

            {/* Cast Section */}
            {movie.credits?.cast && movie.credits.cast.length > 0 && (
              <>
                <Typography
                  variant="h5"
                  component="h2"
                  gutterBottom
                  fontWeight="bold"
                  sx={{ mt: 4 }}
                >
                  Cast
                </Typography>
                <Divider sx={{ mb: 3 }} />

                <Grid container spacing={2}>
                  {movie.credits.cast.slice(0, 6).map((person) => (
                    <Grid item key={person.id} xs={6} sm={4} md={2}>
                      <Paper sx={{ p: 1, textAlign: "center", height: "100%" }}>
                        <Box
                          component="img"
                          src={
                            person.profile_path
                              ? `https://image.tmdb.org/t/p/w185${person.profile_path}`
                              : "https://via.placeholder.com/185x278?text=No+Image"
                          }
                          alt={person.name}
                          sx={{ width: "100%", borderRadius: "4px", mb: 1 }}
                        />
                        <Typography variant="body2" fontWeight="bold" noWrap>
                          {person.name}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          noWrap
                        >
                          {person.character}
                        </Typography>
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              </>
            )}
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default MovieDetailPage;
