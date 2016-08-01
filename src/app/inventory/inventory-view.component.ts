import { Component, Input } from '@angular/core';
import { Apollo } from 'angular2-apollo';

import { client } from '../apollo-client-init';
import { ProductShortComponent } from '../product/product-short.component';
import { InventoryViewQuery } from './inventory-view.interface';

import gql from 'graphql-tag';

@Component({
    selector: 'inventory-view',
    template: `
      <table *ngIf="!data.loading">
        <tr>
          <th>Name</th>
          <th>SKU</th>
          <th>Cost to Manufacture</th>
          <th>Retail Price</th>
          <th>Quantity</th>
          <th *ngIf="editable"></th>
        </tr>
        <tr *ngFor="let product of data.shipment.inventory">
          <product-short [sku]="product.sku"></product-short>
          <th *ngIf="editable" (click)="delete(product)">Delete</th>
        </tr>
      </table>
    `,
    directives: [ProductShortComponent],
})
@Apollo({
  client,
  queries: (component: InventoryViewComponent) => ({
    data: {
      query: gql`
        query getInventory($id: String!) {
          shipment(id: $id) {
            inventory {
              sku
            }
          }
        }
      `,
      variables: {
        id: component.shipmentId
      }
    }
  })
})
export class InventoryViewComponent {
    @Input() shipmentId: string;
    @Input() editable: boolean;

    data: InventoryViewQuery;

    delete(product) {
      // this.inventory.splice(this.inventory.indexOf(item), 1);
    }
    add(product) {
      // this.inventory.push(item);
    }
}
