import { ApolloQuery } from 'angular2-apollo';

interface Shipment {
  inventory: Product[];
}

interface Product {
  sku: string;
}

export interface InventoryViewQuery extends ApolloQuery {
  shipment: Shipment;
}
