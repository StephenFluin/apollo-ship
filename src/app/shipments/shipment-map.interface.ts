import { ApolloQuery } from 'angular2-apollo';

import { Location } from '../shared/interfaces';

interface Shipment {
  name: string;
  origin: Location;
  currentLocation: Location;
  destination: Location;
}

export interface ShipmentMapQuery extends ApolloQuery {
  shipment: Shipment;
}
