import { ApolloQuery } from 'angular2-apollo';

interface Shipments {
  id: number;
}

export interface ShipmentsListQuery extends ApolloQuery {
  shipments: Shipments[];
}
