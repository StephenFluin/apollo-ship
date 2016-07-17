import { ApolloQuery } from 'angular2-apollo';

import { ShipmentShort } from './shipment-short.interface';

export interface ShipmentShortWithDataQuery extends ApolloQuery {
  shipment: ShipmentShort;
}
