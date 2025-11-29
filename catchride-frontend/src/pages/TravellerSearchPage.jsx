import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Card,
  CardContent
} from "@mui/material";
import MapSelectors from "../components/MapSelectors";
import api from "../api/api";
import BookingDialog from "../components/BookingDialog";
import RidePreview from "../components/RidePreview";

export default function TravellerSearchPage() {
  const [pickup, setPickup] = useState(null);
  const [drop, setDrop] = useState(null);
  const [matches, setMatches] = useState([]);

  // booking dialog state
  const [bookingData, setBookingData] = useState(null);
  const [open, setOpen] = useState(false);

  // ⭐ new preview state values
  const [selectedRide, setSelectedRide] = useState(null);
  const [previewOpen, setPreviewOpen] = useState(false);

  // ---------------------------
  // SEARCH MATCHING RIDES
  // ---------------------------
  const searchRides = async () => {
    if (!pickup || !drop) return alert("Select pickup and drop.");
    try {
      const res = await api.get(
        `/api/rides/search?startLat=${pickup.lat}&startLng=${pickup.lng}&endLat=${drop.lat}&endLng=${drop.lng}`
      );
      setMatches(res.data.rides || res.data);
    } catch (err) {
      alert(err.response?.data?.message || err.message);
    }
  };

  // ---------------------------
  // BOOK RIDE
  // ---------------------------
  const bookRide = async (rideId) => {
    try {
      const res = await api.post("/api/bookings/book", { rideId });
      setBookingData(res.data);
      setOpen(true);
    } catch (err) {
      alert(err.response?.data?.message || err.message);
    }
  };

  return (
    <Box className="app-container">
      <Typography variant="h5">Traveller - Find Rides</Typography>

      {/* MAP FOR PICKUP + DROP */}
      <MapSelectors
        pickup={pickup}
        drop={drop}
        setPickup={setPickup}
        setDrop={setDrop}
      />

      <div className="controls">
        <Button variant="contained" onClick={searchRides}>
          Search Rides
        </Button>

        <Button
          onClick={() => {
            setPickup(null);
            setDrop(null);
            setMatches([]);
          }}
        >
          Reset
        </Button>
      </div>

      {/* MATCHED RIDES LIST */}
      <Box sx={{ mt: 2 }}>
        {matches.length === 0 && (
          <Typography>No rides found yet</Typography>
        )}

        {matches.map((r) => (
          <Card key={r._id} sx={{ mb: 2 }}>
            <CardContent>
              <Typography>Ride ID: {r._id}</Typography>
              <Typography>
                Start: {r.startLocation.address} ({r.startLocation.lat},{" "}
                {r.startLocation.lng})
              </Typography>
              <Typography>
                End: {r.endLocation.address} ({r.endLocation.lat},{" "}
                {r.endLocation.lng})
              </Typography>

              {/* ⭐ NEW: PREVIEW BUTTON */}
              <Button
                variant="contained"
                sx={{ mt: 1 }}
                onClick={() => {
                  setSelectedRide(r);
                  setPreviewOpen(true);
                }}
              >
                Preview
              </Button>
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* ⭐ BOOKING DETAILS POPUP */}
      <BookingDialog
        open={open}
        onClose={() => setOpen(false)}
        data={bookingData}
      />

      {/* ⭐ RIDE PREVIEW MAP POPUP */}
      <RidePreview
        open={previewOpen}
        onClose={() => setPreviewOpen(false)}
        ride={selectedRide}
        onBook={(rideId) => {
          bookRide(rideId);
          setPreviewOpen(false);
        }}
      />
    </Box>
  );
}
