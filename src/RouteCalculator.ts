import { MapPoint, MapPath, Vehicle } from './app/types';
import { transport as transportList } from './constants/transport';

class RouteCalculator {
  static async getPath(
    from: MapPoint,
    to: MapPoint,
    vehicle: Vehicle
  ): Promise<MapPath> {
    const path = [from, to];
    const { travelMode } = transportList[vehicle];

    if (travelMode === 'OTHER') {
      return path;
    }

    return new Promise((resolve) => {
      const directionsService = new google.maps.DirectionsService();
      const request = {
        origin: from,
        destination: to,
        travelMode: google.maps.TravelMode[travelMode],
      };

      directionsService.route(request, (response, status) => {
        if (status !== 'OK') {
          console.error('Directions request failed due to:' + status);
          return resolve(path);
        }

        if (response?.routes[0]?.overview_path) {
          const overviewPath = response.routes[0].overview_path;
          const linePath = overviewPath.reduce((acc: MapPath, point: any) => {
            return [...acc, { lat: point.lat(), lng: point.lng() }];
          }, []);

          return resolve(linePath);
        }

        return resolve(path);
      });
    });
  }
}

export default RouteCalculator;
