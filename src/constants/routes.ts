import { Route } from '../app/types';

const routes: Route[] = [
  {
    id: 'nYw34AOsYpJG5BXHfXQzx',
    departure: '2019-10-16 01:10:00',
    arrival: '2019-10-16 07:30:00',
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
    departure: '2019-10-16 01:10:00',
    arrival: '2019-10-16 07:30:00',
    from: {
      name: 'Dubai',
      lat: 55.7558,
      lng: 37.6173,
    },
    to: {
      name: 'Manila',
      lat: 25.2048,
      lng: 55.2708,
    },
    transport: 'plane',
    path: [
      { lat: 55.7558, lng: 37.6173 },
      { lat: 25.2048, lng: 55.2708 },
    ],
  },
];

export { routes };
