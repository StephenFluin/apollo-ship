import { Component, Input } from '@angular/core';
import { Apollo } from 'angular2-apollo';

import { client } from '../apollo-client-init';
import { ProductDetailsQuery } from './product-details.interface';

import gql from 'graphql-tag';

@Component({
    selector: 'product-details',
    template: `
    <div *ngIf="!data.loading">
        <h2>{{ data.product.name }}</h2>
        <div>SKU: {{ data.product.sku }}</div>
        <div>Cost to Manufacture: {{ data.product.costToManufacture / 100 | currency: 'USD' : 'true' }}</div>
        <div>Retail Price: {{ data.product.retailPrice / 100 | currency: 'USD' : 'true' }}</div>
    </div>
    <fieldset>Other 3rd party information about product:</fieldset>
    `,
})
@Apollo({
  client,
  queries: (component: ProductDetailsComponent) => ({
    data: {
      query: gql`
        query getProduct($sku: String!) {
          product (sku: $sku) {
            name
            costToManufacture
            retailPrice
          }
        }
      `,
      variables: {
        sku: component.sku
      }
    }
  })
})
export class ProductDetailsComponent {
  @Input() sku: string;

  data: ProductDetailsQuery;
}
