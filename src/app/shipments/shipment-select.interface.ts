import { ApolloQuery } from 'angular2-apollo';

export interface Shipment {
  id: string;
  name: string;
  originName: string;
  destinationName: string;
}

export interface ShipmentSelectQuery extends ApolloQuery {
  shipment: Shipment;
}
