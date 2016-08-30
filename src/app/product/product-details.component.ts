import { Component, Input } from '@angular/core';
import { Apollo } from 'angular2-apollo';

import { client } from '../apollo-client-init';
import { ProductDetailsQuery } from './product-details.interface';
// import { productInfoFragment } from '../shared/fragments';

import gql from 'graphql-tag';

@Component({
	moduleId: module.id,
    selector: 'product-details',
    templateUrl: 'product-details.component.html',
	styleUrls: ['../home.component.css']
})
@Apollo({
  client,
  queries: (component: ProductDetailsComponent) => ({
    data: {
      query: gql`
        query getProduct($sku: String!) {
          product (sku: $sku) {
            #...productInfo
            name
            costToManufacture
            retailPrice
          }
        }
      `,
      variables: {
        sku: component.sku
      },
      //fragments: productInfoFragment
    }
  })
})
export class ProductDetailsComponent {
  @Input() sku: string;

  data: ProductDetailsQuery;

  lat: number = 37.418901;
  lng: number =  -122.079767;
}
