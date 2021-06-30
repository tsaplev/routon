import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Route } from '../../app/types';
import { deleteLastRoute, deleteAllRoutes, selectRoutes } from './routeSlice';

export function List() {
  const routes = useSelector(selectRoutes);
  const dispatch = useDispatch();

  return (
    <div className="table dbg-box">
      <h2>List</h2>
      {routes.map((el: Route) => {
        const route = Object.assign({}, el);
        delete route.path;
        // route.from = el.from.name,
        // route.to = el.to.name,
        // route.by = el.transport,

        return (
          <pre key={route.id} style={{ background: 'lightgray' }}>
            <p>{JSON.stringify(route, null, 2)}</p>
          </pre>
        );
      })}
      <button onClick={() => dispatch(deleteLastRoute())}>Delete</button>
      <button onClick={() => dispatch(deleteAllRoutes())}>Delete all</button>
    </div>
  );
}
