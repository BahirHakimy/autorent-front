import L from 'leaflet';
import { createControlComponent } from '@react-leaflet/core';
import 'leaflet-routing-machine';

const createRoutineMachineLayer = ({ pickup, dropoff, setDistance }) => {
  const instance = L.Routing.control({
    waypoints: [
      L.latLng(pickup.lat, pickup.lon),
      L.latLng(dropoff.lat, dropoff.lon),
    ],
    draggableWayPoints: false,
    routeWhileDragging: false,
    createMarker: function () {
      return null;
    },
    lineOptions: {
      addWaypoints: false,
    },
  });

  instance.on('routesfound', (e) => {
    var routes = e.routes;
    var summary = routes[0].summary;
    setDistance?.(summary.totalDistance / 1000);
  });

  return instance;
};

const RoutingMachine = createControlComponent(createRoutineMachineLayer);

export default RoutingMachine;
