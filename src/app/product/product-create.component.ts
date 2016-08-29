import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Apollo } from 'angular2-apollo';
import { ApolloQueryResult } from 'apollo-client';

import { client } from '../apollo-client-init';
import { Product } from '../shared/models';

import gql from 'graphql-tag';

@Component({
	moduleId: module.id,
  selector: 'product-create',
  templateUrl: 'product-create.component.html',
  styleUrls: ['../home.component.css']
})
@Apollo({
  client,
  mutations(component: ProductCreateComponent) {
    return {
      add: () => ({
        mutation: gql`
          mutation addProduct(
            $name: String!
            $costToManufacture: Float!
            $retailPrice: Float!
            $quantity: Int!
          ) {
            addProduct(
              name: $name
              costToManufacture: $costToManufacture
              retailPrice: $retailPrice
              quantity: $quantity
            ) {
              sku
            }
          }
        `,
        variables: component.product
      })
    };
  }
})
export class ProductCreateComponent {
  product: Product = new Product();
  add: () => Promise<ApolloQueryResult>;

  lat: number = 37.418901;
  lng: number =  -122.079767;

  constructor(private router: Router) {}

  save() {
    this.add()
      .then(() => {
        this.router.navigateByUrl('/');
      })
      .catch((error) => {
        console.log('Error:', error);
      });
  }
}
