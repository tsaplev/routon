import { Transport } from '../app/types';

export const transport: Transport = {
  plane: {
    label: 'Plane',
    icon: '✈️',
    travelMode: 'OTHER',
  },
  car: {
    label: 'Car',
    icon: '🚘',
    travelMode: 'DRIVING',
  },
  bus: {
    label: 'Bus',
    icon: '🚍',
    travelMode: 'DRIVING',
  },
  train: {
    label: 'Train',
    icon: '🚆',
    travelMode: 'TRANSIT',
  },
  ship: {
    label: 'Ship',
    icon: '🚢',
    travelMode: 'OTHER',
  },
  other: {
    label: 'Other',
    icon: '➡',
    travelMode: 'OTHER',
  },
};
