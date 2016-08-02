import { Component, Output, EventEmitter } from '@angular/core';
import { Apollo, ApolloQuery } from 'angular2-apollo';

import { client } from '../apollo-client-init';
import { ProductShortComponent } from '../product/product-short.component';
import { InventorySelectQuery } from './inventory-select.interface';

import gql from 'graphql-tag';

@Component({
    selector: 'inventory-select',
    template: `
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
          <input type="checkbox" [checked]="product.selected" (change)="_toggle(product)" style="float: left;" />
          <product-short [sku]="product.sku"></product-short>
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
  @Output() select: EventEmitter<any> = new EventEmitter();
  @Output() deselect: EventEmitter<any> = new EventEmitter();

  data: InventorySelectQuery;

  _select(product): void {
    product.selected = true;
    this.select.emit(product);
  }

  _deselect(product): void {
    product.selected = false;
    this.deselect.emit(product);
  }

  _toggle(product): void {
    if (product.selected) {
      this._deselect(product);
    } else {
      this._select(product);
    }
  }
}
