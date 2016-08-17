import { Component, Input } from '@angular/core';
import { Apollo } from 'angular2-apollo';

import { client } from '../apollo-client-init';
import { ProductShortQuery } from './product-short.interface';

import gql from 'graphql-tag';

@Component({
    selector: 'product-short',
    template: `
    <div *ngIf="data.product">
      <td><a [routerLink]="['/products', sku]">{{ data.product.name }}</a></td>
      <td>{{ sku }}</td>
      <td>{{ data.product.costToManufacture / 100 | currency: 'USD' : 'true' }}</td>
      <td>{{ data.product.retailPrice / 100 | currency: 'USD' : 'true' }}</td>
      <td>{{ data.product.quantity }}</td>
    </div>
    `,
})
@Apollo({
  client,
  queries: (component: ProductShortComponent) => ({
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
export class ProductShortComponent {
  @Input() sku: string;

  data: ProductShortQuery;
}
