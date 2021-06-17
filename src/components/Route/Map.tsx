import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Route } from '../../app/types';
import { selectRoutes } from './routeSlice';

export function Map() {
  const routes = useSelector(selectRoutes);

  useEffect(() => {
    console.log('Component did mount');
    const map = new google.maps.Map(
      document.getElementById('map') as HTMLElement,
      {
        zoom: 2.3,
        center: { lat: 50, lng: 80 },
        mapTypeId: 'terrain',
        disableDefaultUI: true,
        zoomControl: true,
      }
    );

    renderRoutes(map, routes);
  }, [routes]);

  const renderRoutes = (map: any, routes: Route[]) => {
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
          text: String(index + 1),
          color: 'white',
        },
        icon: cirlce,
      };

      new google.maps.Marker({
        ...point,
        position: from,
      });
      bounds.extend(from);

      new google.maps.Polyline({
        map: map,
        path: route.path,
        geodesic: true,
        strokeColor: '#FF0000',
        strokeOpacity: 1.0,
        strokeWeight: 2,
      });

      new google.maps.Marker({
        ...point,
        // label: null,
        position: to,
      });
      bounds.extend(to);

      if (!bounds.isEmpty()) {
        map.fitBounds(bounds);
      }
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
