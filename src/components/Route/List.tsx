import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Route } from '../../app/types';
import { transport } from '../../constants/transport';
import { deleteLastRoute, deleteAllRoutes, selectRoutes } from './routeSlice';

export function List() {
  const routes = useSelector(selectRoutes);
  const dispatch = useDispatch();

  const formatDate = (date: string): React.ReactNode => {
    // const userDate = new Date(date);
    // const month = userDate.toLocaleString('en-gb', { day: 'numeric', month: 'short' });
    // const time = new Intl.DateTimeFormat('en-GB', { timeStyle: 'short' }).format(userDate)
    // return <>{month} <b>{time}</b></>;
    return date;
  }

  return (
    <div className="table dbg-box">
      <h2>List</h2>
      {routes.map((el: Route) => {
        return (
          <p key={el.id} className='route-row'>
            <i>{formatDate(el.departure)}</i>
            <span>{el.from.name} {transport[el.transport].icon} {el.to.name}</span>
            <i>{formatDate(el.arrival)}</i>
          </p>
        );
      })}
      <button onClick={() => dispatch(deleteLastRoute())}>Delete</button>
      <button onClick={() => dispatch(deleteAllRoutes())}>Delete all</button>
    </div>
  );
}
