import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Apollo } from 'angular2-apollo';
import { ApolloQueryResult } from 'apollo-client';

import { client } from '../apollo-client-init';
import { Product } from '../shared/models';

import gql from 'graphql-tag';

@Component({
  selector: 'product-create',
  template: `
    <h2>New Product</h2>
    <div class="content">
      <div><input [(ngModel)]="product.name" placeholder="Name"></div>
      <div><input [(ngModel)]="product.costToManufacture" placeholder="Cost to manufacture"></div>
      <div><input [(ngModel)]="product.retailPrice" placeholder="Retail price"></div>
      <div><input [(ngModel)]="product.quantity" type="number" placeholder="Quantity"></div>

      <button md-raised-button color="primary" (click)="save()">Create</button>
    </div>
  `,
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
