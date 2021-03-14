import { MapPoint, MapPath, Vehicle } from './app/types';
import { transport as transportList } from './constants/transport';

class RouteCalculator {
  static async getPath(
    from: MapPoint,
    to: MapPoint,
    vehicle: Vehicle
  ): Promise<MapPath> {
    let path = [from, to];
    const { travelMode } = transportList[vehicle];

    if (travelMode !== 'OTHER') {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (travelMode) {
            console.log(`Calulating path throught ${travelMode}`);
            resolve(path);
          } else {
            reject(`Something went wrong`);
          }
        }, 1000);
      });
    }

    return [from, to];
  }
}

export default RouteCalculator;
