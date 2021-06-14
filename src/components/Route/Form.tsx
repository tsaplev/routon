import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addRoute, selectRoutesLoadingStatus } from './routeSlice';
import { nanoid } from 'nanoid';
import Geosuggest from 'react-geosuggest';
import { useForm } from 'react-hook-form';
import DatePicker from 'react-datepicker';

import ru from 'date-fns/locale/ru';
import 'react-datepicker/dist/react-datepicker.css';
import '../LocationInput/index.css';

export function Form() {
  const isLoading = useSelector(selectRoutesLoadingStatus);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
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
        departure: data.departure.toISOString(),
        arrival: data.arrival.toISOString(),
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
  };

  const RouteDatePicker = ({ label }: { label: string }) => {
    const selectedDate = watch(label, null);

    const getMinDate = () => {
      if (label === 'departure') {
        return null;
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
        locale={ru}
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

  if (isLoading) {
    return (
      <div className="dbg-box">
        <h2>Form</h2>
        <h2>Calculating shortest path...</h2>
      </div>
    );
  }

  return (
    <div className="dbg-box">
      <h2>Form</h2>
      <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
        {/* From */}
        <div className="dbg-box__input">
          <Geosuggest
            {...register('from', { required: true })}
            onChange={() => {}}
            onBlur={() => {}}
            onSuggestSelect={(data: any) => {
              setValue('from', data);
            }}
            autoComplete="off"
          />
          {errors.from && (
            <span style={{ color: 'red' }}> This field is required</span>
          )}
        </div>

        {/* Departure */}
        <div className="dbg-box__input">
          <RouteDatePicker label="departure" />
          {errors.departure && (
            <span style={{ color: 'red' }}> This field is required</span>
          )}
        </div>

        {/* Transport */}
        <div className="dbg-box__input">
          <select
            {...register('transport', { required: true })}
            name="transport"
            defaultValue=""
          >
            <option hidden label=" -- " />
            <option value="plane">Plane</option>
            <option value="train">Train</option>
            <option value="car">Car</option>
            <option value="bus">Bus</option>
            <option value="ship">Ship</option>
            <option value="other">Other</option>
          </select>
          {errors.transport && (
            <span style={{ color: 'red' }}> This field is required</span>
          )}
        </div>

        {/* Arrival */}
        <div className="dbg-box__input">
          <RouteDatePicker label="arrival" />
          {errors.arrival && (
            <span style={{ color: 'red' }}> This field is required</span>
          )}
        </div>

        {/* To */}
        <div className="dbg-box__input">
          <Geosuggest
            {...register('to', { required: true })}
            onChange={() => {}}
            onBlur={() => {}}
            onSuggestSelect={(data: any) => {
              setValue('to', data);
            }}
            autoComplete="off"
          />
          {errors.to && (
            <span style={{ color: 'red' }}> This field is required</span>
          )}
        </div>

        <button type="submit">Add</button>
      </form>
    </div>
  );
}
