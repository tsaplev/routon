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

export type Vehicle = 'plane' | 'train' | 'car' | 'bus' | 'ship' | 'other';

export interface TransportItem {
  label: string;
  icon: string;
  travelMode: TravelMode;
}

export type Transport = {
  [key in Vehicle]: TransportItem;
};

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
