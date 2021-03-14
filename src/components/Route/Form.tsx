import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addRouteAsync, selectRoutesLoadingStatus } from './routeSlice';
import { nanoid } from 'nanoid';

export function Form() {
  const isLoading = useSelector(selectRoutesLoadingStatus);
  const dispatch = useDispatch();

  const createRoute = () => {
    dispatch(
      addRouteAsync({
        id: nanoid(),
        departure: '2019-10-16 01:10:00',
        arrival: '2019-10-16 07:30:00',
        from: {
          name: 'Manila',
          lat: 55.7558,
          lon: 37.6173,
        },
        to: {
          name: 'Sydney',
          lat: 25.2048,
          lon: 55.2708,
        },
        transport: 'plane',
        path: [
          { lat: 55.7558, lon: 37.6173 },
          { lat: 25.2048, lon: 55.2708 },
        ],
      })
    );
  };

  return (
    <div className="dbg-box">
      <h2>Form</h2>
      {isLoading ? (
        <h2>Calculating shortest path...</h2>
      ) : (
        <form>
          <p>
            <input type="text" name="from" />
          </p>
          <p>
            <select name="transport">
              <option value="plane">Plane</option>
              <option value="train">Train</option>
            </select>
          </p>
          <p>
            <input type="text" name="to" />
          </p>
          <button type="button" onClick={createRoute}>
            Add
          </button>
        </form>
      )}
    </div>
  );
}
