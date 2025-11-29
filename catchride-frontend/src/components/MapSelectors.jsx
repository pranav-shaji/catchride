import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents, Polyline } from "react-leaflet";
import L from "leaflet";

// Fix default icon paths for CRA
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

function ClickHandler({ onPick }) {
  const [step, setStep] = useState("pickup");
  useMapEvents({
    click(e) {
      onPick(step, e.latlng);
      if (step === "pickup") setStep("drop");
    },
  });
  return null;
}

export default function MapSelectors({ center = [11.0183, 76.9725], pickup, drop, setPickup, setDrop }) {
  return (
    <MapContainer center={center} zoom={13} className="leaflet-container">
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="© OpenStreetMap contributors" />

      <ClickHandler onPick={(step, latlng) => {
        if (step === "pickup") setPickup(latlng);
        else setDrop(latlng);
      }} />

      {pickup && <Marker position={pickup} />}
      {drop && <Marker position={drop} />}
      {pickup && drop && <Polyline positions={[pickup, drop]} />}
    </MapContainer>
  );
}
