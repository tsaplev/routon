import { Route } from '../app/types';

const routes: Route[] = [
  {
    id: 'nYw34AOsYpJG5BXHfXQzx',
    departure: '2021-06-16 01:10:00',
    arrival: '2021-06-16 07:30:00',
    from: {
      name: 'Moscow',
      lat: 55.7558,
      lng: 37.6173,
    },
    to: {
      name: 'Dubai',
      lat: 25.2048,
      lng: 55.2708,
    },
    transport: 'plane',
    path: [
      { lat: 55.7558, lng: 37.6173 },
      { lat: 25.2048, lng: 55.2708 },
    ],
  },
  {
    id: 'Sy0BEfPNO3EiyUuzc2x6U',
    departure: '2021-06-28 01:10:00',
    arrival: '2021-06-28 07:30:00',
    from: {
      name: 'Dubai',
      lat: 55.7558,
      lng: 37.6173,
    },
    to: {
      name: 'Manila',
      lat: 14.5995,
      lng: 120.9842,
    },
    transport: 'plane',
    path: [
      { lat: 25.2048, lng: 55.2708 },
      { lat: 14.5995, lng: 120.9842 },
    ],
  },
];

export { routes };
