export interface MapPoint {
  lat: number;
  lon: number;
}

export type MapPath = MapPoint[];

export type Vehicle = 'plane' | 'train' | 'car' | 'bus' | 'other';

interface Direction extends MapPoint {
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
