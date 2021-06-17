import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addRoute, selectRoutesLoadingStatus } from './routeSlice';
import { nanoid } from 'nanoid';
import Geosuggest from 'react-geosuggest';
import { useForm } from 'react-hook-form';
import { selectRoutes } from './routeSlice';
import { transport } from '../../constants/transport';

import 'react-datepicker/dist/react-datepicker.css';
import '../LocationInput/index.css';

export function Form() {
  const isLoading = useSelector(selectRoutesLoadingStatus);
  const routes = useSelector(selectRoutes);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    mode: 'onSubmit',
    shouldFocusError: false,
    reValidateMode: 'onBlur',
  });

  const onSubmit = (data: any) => {
    dispatch(
      addRoute({
        id: nanoid(),
        // departure: data.departure.toISOString(),
        // arrival: data.arrival.toISOString(),
        departure: '2019-02-03 14:05',
        arrival: '2019-02-04 01:23',
        from: {
          name: data.from.gmaps?.name,
          lat: data.from.location?.lat,
          lng: data.from.location?.lng,
        },
        to: {
          name: data.to.gmaps?.name,
          lat: data.to.location?.lat,
          lng: data.to.location?.lng,
        },
        transport: data.transport,
        path: [],
      })
    );

    reset();
  };

  if (isLoading) {
    return (
      <div className="dbg-box">
        <h2>Form</h2>
        <h2>Calculating shortest path...</h2>
      </div>
    );
  }

  const getFrom = () => {
    const latestEnd = routes[routes.length - 1]?.to;

    if (latestEnd) {
      return {
        required: !(latestEnd.name.length > 0),
        value: {
          gmaps: { name: latestEnd.name },
          location: {
            lat: latestEnd.lat,
            lng: latestEnd.lng,
          },
        },
      };
    }

    return {
      required: true,
      value: null,
    };
  };

  const fromSuggestion = getFrom();

  return (
    <div className="dbg-box">
      <h2>Form</h2>
      <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
        {/* From */}
        <div
          className="dbg-box__input"
          style={{ borderColor: errors.from ? 'red' : 'transparent' }}
        >
          <Geosuggest
            {...register('from', {
              required: fromSuggestion.required,
              value: fromSuggestion.value,
            })}
            initialValue={fromSuggestion.value?.gmaps.name}
            disabled={!fromSuggestion.required}
            onChange={() => {}}
            onBlur={() => {}}
            onSuggestSelect={(data) => {
              setValue('from', data);
            }}
            autoComplete="off"
          />
        </div>

        {/* Departure */}
        {/* <div className="dbg-box__input">
          <RouteDatePicker label="departure" />
          {errors.departure && (
            <span style={{ color: 'red' }}> This field is required</span>
          )}
        </div> */}

        {/* Transport */}
        <div
          className="dbg-box__input"
          style={{ borderColor: errors.transport ? 'red' : 'transparent' }}
        >
          <select
            {...register('transport', { required: true })}
            name="transport"
          >
            <option hidden label=" -- " />
            {Object.entries(transport).map(([key, value]) => (
              <option key={key} value={key}>
                {value.label}
              </option>
            ))}
          </select>
        </div>

        {/* Arrival */}
        {/* <div className="dbg-box__input">
          <RouteDatePicker label="arrival" />
          {errors.arrival && (
            <span style={{ color: 'red' }}> This field is required</span>
          )}
        </div> */}

        {/* To */}
        <div
          className="dbg-box__input"
          style={{ borderColor: errors.to ? 'red' : 'transparent' }}
        >
          <Geosuggest
            {...register('to', { required: true })}
            onChange={() => {}}
            onBlur={() => {}}
            onSuggestSelect={(data: any) => {
              setValue('to', data);
            }}
            autoComplete="off"
          />
        </div>

        <button type="submit">Add</button>
      </form>
    </div>
  );
}
