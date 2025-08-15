"use client";

import {useState} from "react";
import {MapContainer, TileLayer, Marker, useMapEvents} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const customIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

function LocationMarker({onSelect}) {
  const [position, setPosition] = useState(null);

  useMapEvents({
    click(e) {
      setPosition(e.latlng);
      onSelect(e.latlng); // return coords to parent
    },
  });

  return position ? <Marker position={position} icon={customIcon} /> : null;
}

export default function MapComponent({onSelect}) {
  return (
    <MapContainer
      center={[33.6844, 73.0479]} // Islamabad default
      zoom={13}
      style={{height: "300px", width: "100%", borderRadius: "1rem", marginTop: "1rem"}}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LocationMarker onSelect={onSelect} />
    </MapContainer>
  );
}



