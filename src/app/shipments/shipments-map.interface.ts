import { ApolloQuery } from 'angular2-apollo';

import { Location } from '../shared/interfaces';

interface Shipment {
  id: string;
  name: string;
  currentLocation: Location;
}

export interface ShipmentsMapQuery extends ApolloQuery {
  shipments: Shipment[];
}
