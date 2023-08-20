import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Popup, Marker } from 'react-leaflet';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import { Routing } from '.';
import { setDistance } from '../../context/features/searchSlice';

function Map() {
  const { pickup, dropoff } = useSelector((state) => state.search.locations);
  const [position, setPosition] = useState([34.51541109, 69.1338373]);

  const mapRef = useRef();
  const dispatch = useDispatch(setDistance);

  useEffect(() => {
    if (pickup.lat) {
      if (dropoff.lat) {
        setPosition([dropoff.lat, dropoff.lon]);
      } else {
        setPosition([pickup.lat, pickup.lon]);
      }
    }
  }, [dropoff.lat, dropoff.lon, pickup.lat, pickup.lon]);

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.panTo(L.latLng(position[0], position[1]));
    }
  }, [position]);

  const greenIcon = L.icon({
    iconUrl:
      'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
    shadowUrl:
      'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  const redIcon = L.icon({
    iconUrl:
      'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl:
      'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  return (
    <MapContainer
      className="h-[500px] rounded-md"
      center={position}
      zoom={13}
      scrollWheelZoom={true}
      ref={mapRef}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {pickup.lat && (
        <Marker
          position={[pickup.lat, pickup.lon]}
          icon={redIcon}
          draggable={false}
        >
          <Popup>Pick-up location</Popup>
        </Marker>
      )}
      {dropoff.lat && (
        <Marker
          position={[dropoff.lat, dropoff.lon]}
          icon={greenIcon}
          draggable={false}
        >
          <Popup>Drop-off location</Popup>
        </Marker>
      )}
      {pickup.lat && dropoff.lat && (
        <Routing
          pickup={pickup}
          dropoff={dropoff}
          setDistance={(distance) => dispatch(setDistance(distance))}
        />
      )}
    </MapContainer>
  );
}

export default Map;
