import { Component, Output, EventEmitter } from '@angular/core';
import { Apollo, ApolloQuery } from 'angular2-apollo';

import { client } from '../apollo-client-init';
import { ProductShortComponent } from '../product/product-short.component';
import { Product, InventorySelectQuery } from './inventory-select.interface';

import gql from 'graphql-tag';

@Component({
    selector: 'inventory-select',
    template: `
      <h3>Selected</h3>
      <table *ngIf="productsSelected.length">
        <tr>
          <th>Name</th>
          <th>SKU</th>
          <th>Cost to Manufacture</th>
          <th>Retail Price</th>
          <th>Quantity</th>
          <th></th>
        </tr>
        <tr *ngFor="let product of productsSelected">
          <product-short [sku]="product.sku"></product-short>
          <th (click)="_remove(product)">Remove</th>
        </tr>
      </table>
      <h3>Available</h3>
      <table *ngIf="!data.loading">
        <tr>
          <th>Name</th>
          <th>SKU</th>
          <th>Cost to Manufacture</th>
          <th>Retail Price</th>
          <th>Quantity</th>
          <th></th>
        </tr>
        <tr *ngFor="let product of data.products">
          <product-short [sku]="product.sku"></product-short>
          <th *ngIf="!product.added" (click)="_add(product)">Add</th>
        </tr>
      </table>
    `,
    directives: [ProductShortComponent]
})
@Apollo({
  client,
  queries: (component: InventorySelectComponent) => ({
    data: {
      query: gql`
        query getInventory {
          products {
            sku
          }
        }
      `
    }
  })
})
export class InventorySelectComponent {
  @Output() add: EventEmitter<any> = new EventEmitter();
  @Output() remove: EventEmitter<any> = new EventEmitter();

  data: InventorySelectQuery;
  productsSelected: Product[] = [];

  _add(product): void {
    product.added = true;
    this.productsSelected.push(product);
    this.add.emit(product);
  }

  _remove(product): void {
    product.added = false;
    const i = this.productsSelected.indexOf(product);

    if (i > -1) {
      this.productsSelected.splice(i, 1);
    }

    this.remove.emit(product);
  }
}
