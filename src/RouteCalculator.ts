import {
  MapPoint,
  MapPath,
  Vehicle,
  TransportItem,
  TravelMode,
} from './app/types';
import { transport as transportList } from './constants/transport';

class RouteCalculator {
  readonly from: MapPoint;
  readonly to: MapPoint;
  readonly transport: TransportItem;

  constructor(from: MapPoint, to: MapPoint, vehicle: Vehicle) {
    this.from = from;
    this.to = to;
    this.transport = transportList[vehicle];
  }

  calculate(
    from: MapPoint,
    to: MapPoint,
    travelMode: TravelMode
  ): Promise<MapPath> {
    let path = [from, to];
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (travelMode) {
          console.log(`Calulating path throught ${travelMode}`);
          resolve(path);
        }
      }, 1000);
    });
  }

  async getPath(): Promise<MapPath> {
    let path = [this.from, this.to];

    if (this.transport.travelMode !== 'OTHER') {
      path = await this.calculate(
        this.from,
        this.to,
        this.transport.travelMode
      );
      return path;
    }

    return [this.from, this.to];
  }
}

export default RouteCalculator;
