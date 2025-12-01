import React, { useState, useContext } from "react";
import { Box, Button, Typography } from "@mui/material";
import MapSelectors from "../components/MapSelectors";
import api from "../api/api";
import { AuthContext } from "../context/AuthContext";

export default function RiderPostPage() {
  const [pickup, setPickup] = useState(null);
  const [drop, setDrop] = useState(null);
 

  const handlePost = async () => {
    if (!pickup || !drop) return alert("Select pickup and drop on map (click pickup then drop).");
    try {
      const body = {
        startLocation: { lat: pickup.lat, lng: pickup.lng, address: "Selected" },
        endLocation: { lat: drop.lat, lng: drop.lng, address: "Selected" }
      };
      const res = await api.post("/api/rides/create", body);
      alert("Ride posted: " + res.data._id);
    } catch (err) {
      alert(err.response?.data?.message || err.message);
    }
  };

  return (
    <Box className="app-container">
      <Typography variant="h5">Post a Ride (Rider)</Typography>
      <MapSelectors pickup={pickup} drop={drop} setPickup={setPickup} setDrop={setDrop} />
      <div className="controls">
        <Button variant="contained" onClick={handlePost}>Post Ride</Button>
        <Button onClick={() => { setPickup(null); setDrop(null); }}>Reset</Button>
      </div>
    </Box>
  );
}
