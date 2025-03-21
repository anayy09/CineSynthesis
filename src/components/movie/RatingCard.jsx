import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Link,
  Tooltip,
  CircularProgress,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

const RatingCircle = styled(Box)(({ theme, color }) => ({
  width: 70,
  height: 70,
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: color || theme.palette.primary.main,
  color: theme.palette.common.white,
  fontWeight: "bold",
  fontSize: "1.5rem",
  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
}));

const StyledCard = styled(Card)(({ theme }) => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  "&:hover": {
    transform: "translateY(-8px)",
    boxShadow: theme.shadows[8],
  },
}));

const getRatingColor = (score, max = 10) => {
  // Normalize score to 0-10 scale
  const normalizedScore = (score / max) * 10;

  if (normalizedScore >= 8) return "#4CAF50"; // Green for high scores
  if (normalizedScore >= 6) return "#FFC107"; // Yellow for medium scores
  if (normalizedScore >= 4) return "#FF9800"; // Orange for below average
  return "#F44336"; // Red for poor scores
};

const formatNumber = (num) => {
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`;
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K`;
  }
  return num;
};

const RatingCard = ({
  title,
  score,
  maxScore = 10,
  secondaryScore = null,
  secondaryLabel = null,
  reviewCount = null,
  link = null,
  icon = null,
  loading = false,
}) => {
  // Format score for display
  const displayScore =
    score !== null && score !== undefined
      ? maxScore === 100
        ? Math.round(score)
        : score.toFixed(1)
      : "N/A";

  // Calculate color based on score
  const color =
    score !== null && score !== undefined
      ? getRatingColor(score, maxScore)
      : "#9e9e9e";

  return (
    <StyledCard variant="outlined">
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          height: "100%",
        }}
      >
        <Typography variant="h6" component="h3" gutterBottom align="center">
          {title}
        </Typography>

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", my: 2 }}>
            <CircularProgress size={60} />
          </Box>
        ) : (
          <RatingCircle color={color}>{displayScore}</RatingCircle>
        )}

        {maxScore !== 10 && !loading && (
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            out of {maxScore}
          </Typography>
        )}

        {secondaryScore !== null && !loading && (
          <Box sx={{ mt: 2, textAlign: "center" }}>
            <Typography variant="body2" color="text.secondary">
              {secondaryLabel || "Audience"}:
            </Typography>
            <Typography variant="body1" fontWeight="medium">
              {typeof secondaryScore === "number"
                ? maxScore === 100
                  ? Math.round(secondaryScore)
                  : secondaryScore.toFixed(1)
                : secondaryScore}
            </Typography>
          </Box>
        )}

        {reviewCount !== null && !loading && (
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            {formatNumber(reviewCount)} reviews
          </Typography>
        )}

        {link && (
          <Box sx={{ mt: "auto", pt: 2 }}>
            <Link
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {icon && (
                <Box component="span" sx={{ mr: 0.5 }}>
                  {icon}
                </Box>
              )}
              Visit Site
              <OpenInNewIcon fontSize="small" sx={{ ml: 0.5 }} />
            </Link>
          </Box>
        )}
      </CardContent>
    </StyledCard>
  );
};

export default RatingCard;
