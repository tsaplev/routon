export interface MapPoint {
  lat: number;
  lon: number;
}

export type MapPath = MapPoint[];

export type TravelMode =
  | 'DRIVING'
  | 'WALKING'
  | 'BICYCLING'
  | 'TRANSIT'
  | 'OTHER';

export interface TransportItem {
  label: string;
  icon: string;
  travelMode: TravelMode;
}

export type Vehicle = 'plane' | 'train' | 'car' | 'bus' | 'ship' | 'other';

export interface Transport {
  [key: string]: TransportItem; // TODO set to Vehicle
}

export interface Direction extends MapPoint {
  name: string;
}

export type Route = {
  id: string;
  departure: string;
  arrival: string;
  from: Direction;
  to: Direction;
  transport: Vehicle;
  path: MapPath;
};
