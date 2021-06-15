import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectRoutes } from './routeSlice';

export function Map() {
  const routes = useSelector(selectRoutes);

  useEffect(() => {
    function initMap(): void {
      console.log(routes);
      const map = new google.maps.Map(
        document.getElementById('map') as HTMLElement,
        {
          zoom: 2.3,
          center: { lat: 50, lng: 80 },
          mapTypeId: 'terrain',
          disableDefaultUI: true,
        }
      );

      const cirlce = {
        path: google.maps.SymbolPath.CIRCLE,
        fillColor: 'red',
        fillOpacity: 1,
        scale: 4.5,
        strokeColor: 'white',
        strokeWeight: 1,
      };

      const bounds = new google.maps.LatLngBounds();

      routes.forEach((route) => {
        const positionFrom = new google.maps.LatLng(
          route.path[0].lat,
          route.path[0].lng
        );
        new google.maps.Marker({
          map: map,
          position: positionFrom,
          icon: cirlce,
        });
        bounds.extend(positionFrom);

        new google.maps.Polyline({
          map: map,
          path: route.path,
          geodesic: true,
          strokeColor: '#FF0000',
          strokeOpacity: 1.0,
          strokeWeight: 2,
        });

        const positionTo = new google.maps.LatLng(
          route.path[1].lat,
          route.path[1].lng
        );
        new google.maps.Marker({
          map: map,
          position: positionTo,
          icon: cirlce,
        });

        bounds.extend(positionTo);
      });

      if (!bounds.isEmpty()) {
        map.fitBounds(bounds);
      }
    }

    initMap();
  });

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
