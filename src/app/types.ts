export interface MapPoint {
  lat: number;
  lng: number;
}

export type MapPath = MapPoint[];

export interface Direction extends MapPoint {
  name: string;
}

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

export interface Transport {
  [key: string]: TransportItem; // TODO set to Vehicle
}

export type Vehicle = 'plane' | 'train' | 'car' | 'bus' | 'ship' | 'other';
// export enum Vehicle {
//   plane,
//   train,
//   car,
//   bus,
//   ship,
//   other,
// }

export type Route = {
  id: string;
  departure: string;
  arrival: string;
  from: Direction;
  to: Direction;
  transport: Vehicle;
  path: MapPath;
};

export type GoogleMap = google.maps.Map;
export type GoogleMapMarker = google.maps.Marker;
export type GoogleMapPolyline = google.maps.Polyline;
export type GoogleMapData = Array<GoogleMapMarker | GoogleMapPolyline>;
