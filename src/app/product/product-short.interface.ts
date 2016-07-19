import { ApolloQuery } from 'angular2-apollo';

import { ProductInfo } from '../shared/fragments';

interface Product extends ProductInfo {}

export interface ProductShortQuery extends ApolloQuery {
  product: Product;
}
