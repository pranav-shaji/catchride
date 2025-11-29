import React from "react";
import { Dialog, DialogTitle, DialogContent, Button } from "@mui/material";
import { MapContainer, TileLayer, Marker, Polyline } from "react-leaflet";
import L from "leaflet";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

export default function RidePreview({ open, onClose, ride, onBook }) {
  if (!ride) return null;

  const start = ride.startLocation;
  const end = ride.endLocation;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Ride Preview</DialogTitle>
      <DialogContent>
        <MapContainer
          center={[start.lat, start.lng]}
          zoom={12}
          style={{ height: "300px", width: "100%", borderRadius: "8px" }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          <Marker position={[start.lat, start.lng]} />
          <Marker position={[end.lat, end.lng]} />

          <Polyline positions={[[start.lat, start.lng], [end.lat, end.lng]]} />
        </MapContainer>

        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          onClick={() => onBook(ride._id)}
        >
          Book This Ride
        </Button>
      </DialogContent>
    </Dialog>
  );
}
