import { ApolloQuery } from 'angular2-apollo';

export interface Product {
  sku: string;
  added?: boolean;
}

export interface InventorySelectQuery extends ApolloQuery {
  products: Product[];
}
