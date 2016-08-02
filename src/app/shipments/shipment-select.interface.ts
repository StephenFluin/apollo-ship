import { ApolloQuery } from 'angular2-apollo';

export interface Shipment {
  id: string;
  name: string;
}

export interface ShipmentSelectQuery extends ApolloQuery {
  shipment: Shipment;
}
