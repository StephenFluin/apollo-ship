import { ApolloQuery } from 'angular2-apollo';

interface Shipments {
  id: string;
}

export interface ShipmentsListQuery extends ApolloQuery {
  shipments: Shipments[];
}
