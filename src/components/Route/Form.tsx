import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addRoute, selectRoutesLoadingStatus } from './routeSlice';
import { nanoid } from 'nanoid';
import Geosuggest from 'react-geosuggest';
import DatePicker from 'react-datepicker';
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
    watch,
    setValue,
    getValues,
    reset,
    formState: { errors },
  } = useForm({
    mode: 'onSubmit',
    shouldFocusError: false,
    reValidateMode: 'onBlur',
  });

  useEffect(() => {
    reset();
  }, [routes]);

  const RouteDatePicker = ({ label }: { label: string }) => {
    const selectedDate = watch(label, null);
    const latestDeparture = routes[routes.length - 1]?.departure;

    const getMinDate = () => {
      if (label === 'departure') {
        return latestDeparture ? latestDeparture : null;
      }

      if (label === 'arrival') {
        return getValues('departure');
      }
    };

    const getMaxDate = () => {
      if (label === 'departure') {
        return getValues('arrival');
      }

      if (label === 'arrival') {
        return null;
      }
    };

    return (
      <DatePicker
        {...register(label, { required: true })}
        selected={selectedDate}
        timeInputLabel="Time:"
        dateFormat="MMMM d, yyyy h:mm aa"
        showTimeInput
        minDate={getMinDate()}
        maxDate={getMaxDate()}
        onChange={(date: any) => {
          setValue(label, date);
        }}
        withPortal
        placeholderText={label}
      />
    );
  };

  const onSubmit = (data: any) => {
    dispatch(
      addRoute({
        id: nanoid(),
        departure: data.departure.toISOString(),
        arrival: data.arrival.toISOString(),
        // departure: '2019-02-03 14:05',
        // arrival: '2019-02-04 01:23',
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
        required: false,
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

  // const getClosestPossibleDepartureDate = () => {
  //   const latestDeparture = routes[routes.length - 1].departure;
  // };

  const fromSuggestion = getFrom();

  console.log('fromSuggestion.value', getValues('from'));

  return (
    <div className="dbg-box">
      <h2>Form</h2>
      <form
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit, (e) => {
          console.log('e', e);
        })}
      >
        {/* From */}
        <div
          className="dbg-box__input"
          style={{ borderColor: errors.from ? 'red' : 'transparent' }}
        >
          <Geosuggest
            {...register('from', {
              required: true,
              value: getValues('from')
                ? getValues('from')
                : fromSuggestion.value,
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

        <div
          className="dbg-box__input"
          style={{ borderColor: errors.departure ? 'red' : 'transparent' }}
        >
          <RouteDatePicker label="departure" />
        </div>

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

        <div
          className="dbg-box__input"
          style={{ borderColor: errors.arrival ? 'red' : 'transparent' }}
        >
          <RouteDatePicker label="arrival" />
        </div>

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
