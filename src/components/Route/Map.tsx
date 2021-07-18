import React, { useEffect, useState, useRef} from 'react';
import { useSelector } from 'react-redux';
import { GoogleMap, GoogleMapData, Route } from '../../app/types';
import { selectRoutes } from './routeSlice';

export function Map() {
  const routes = useSelector(selectRoutes);
  const [gmap, setGmap] = useState<GoogleMap>();
  const mapData = useRef<GoogleMapData>([]);

  useEffect(() => {
    setGmap(
      new google.maps.Map(document.getElementById('map') as HTMLElement, {
        zoom: 2.5,
        center: { lat: 25, lng: 25 },
        mapTypeId: 'terrain',
        disableDefaultUI: true,
        zoomControl: true,
      })
    );
  }, []);

  useEffect(() => {
    if (gmap) {
      clearRoutes();
      renderRoutes(gmap, routes);
    }
  }, [gmap, routes]);

  const renderRoutes = (map: GoogleMap, routes: Route[]) => {
    const bounds = new google.maps.LatLngBounds();
    const cirlce = {
      path: google.maps.SymbolPath.CIRCLE,
      fillColor: 'red',
      fillOpacity: 1,
      scale: 10,
      strokeColor: 'white',
      strokeWeight: 1,
    };

    routes.forEach((route, index) => {
      const from = new google.maps.LatLng(route.path[0].lat, route.path[0].lng);
      const to = new google.maps.LatLng(route.path[1].lat, route.path[1].lng);
      const point = {
        map: map,
        label: {
          text: String(index),
          color: 'white',
        },
        icon: cirlce,
      };

      point.label.text = String(Number(point.label.text) + 1);
      const markerFrom = new google.maps.Marker({
        ...point,
        position: from,
      });
      bounds.extend(from);
      mapData.current.push(markerFrom);

      const pathLine = new google.maps.Polyline({
        map: map,
        path: route.path,
        geodesic: true,
        strokeColor: '#FF0000',
        strokeOpacity: 1.0,
        strokeWeight: 2,
      });
      mapData.current.push(pathLine);

      point.label.text = String(Number(point.label.text) + 1);
      const markerTo = new google.maps.Marker({
        ...point,
        position: to,
      });
      bounds.extend(to);
      mapData.current.push(markerTo);

      if (!bounds.isEmpty()) {
        map.fitBounds(bounds);
      }
    });
  };

  const clearRoutes = () => {
    mapData.current.forEach((el) => {
      el.setMap(null);
    });
  };

  return (
    <div className="dbg-box">
      <h2>Map</h2>
      {/* {routes.map((route) => {
        return (
          <pre key={route.id} style={{ whiteSpace: 'pre-wrap' }}>
            {JSON.stringify(route.path)}
          </pre>
        );
      })} */}
      <div id="map" style={{ height: '500px' }}></div>
    </div>
  );
}
