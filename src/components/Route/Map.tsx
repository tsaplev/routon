import React from 'react';
import { useSelector } from 'react-redux';
import { selectRoutes } from './routeSlice';

export function Map() {
  const routes = useSelector(selectRoutes);
  return (
    <div className="dbg-box">
      <h2>Map</h2>
      {routes.map((route) => {
        return <pre key={route.id}>{JSON.stringify(route.path)}</pre>;
      })}
    </div>
  );
}
