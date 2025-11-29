import React from "react";
import { Box, Typography } from "@mui/material";

export default function HomePage() {
  return (
    <Box className="app-container">
      <Typography variant="h4">Welcome to CatchRide</Typography>
      <Typography sx={{ mt: 2 }}>Use Rider to post rides. Use Traveller to find and book rides.</Typography>
    </Box>
  );
}
