import { ApolloQuery } from 'angular2-apollo';

import { ShipmentInfo } from '../shared/fragments';

interface Shipment extends ShipmentInfo {}

export interface ShipmentSimpleQuery extends ApolloQuery {
  shipment: Shipment;
}
