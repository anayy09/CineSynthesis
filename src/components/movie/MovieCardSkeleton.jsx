import React from "react";
import { Card, CardContent, Box, Skeleton } from "@mui/material";
import { styled } from "@mui/material/styles";

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

const MovieCardSkeleton = () => {
  return (
    <StyledCard>
      <Skeleton
        variant="rectangular"
        sx={{
          height: 0,
          paddingTop: "150%", // 2:3 aspect ratio for movie posters
          width: "100%",
        }}
      />
      <CardContent>
        <Skeleton variant="text" width="80%" height={28} />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 1,
            mt: 1,
          }}
        >
          <Skeleton variant="text" width="30%" />
          <Skeleton variant="text" width="40%" />
        </Box>
        <Box sx={{ mt: 1 }}>
          <Skeleton variant="rounded" width="40%" height={24} />
        </Box>
      </CardContent>
    </StyledCard>
  );
};

export default MovieCardSkeleton;
