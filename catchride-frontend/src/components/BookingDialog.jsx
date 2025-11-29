import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function BookingDialog({ open, onClose, data }) {
  if (!data) return null;

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Ride Booked</DialogTitle>
      <DialogContent>
        <Typography variant="subtitle1" gutterBottom>
          Rider: {data.rider.name}
        </Typography>
        <Typography>Phone: {data.rider.phone}</Typography>

        <Typography variant="subtitle1" sx={{ mt: 2 }}>
          Traveller: {data.traveller.name}
        </Typography>
        <Typography>Phone: {data.traveller.phone}</Typography>

        <Button variant="contained" sx={{ mt: 2 }} onClick={onClose}>Close</Button>
      </DialogContent>
    </Dialog>
  );
}
