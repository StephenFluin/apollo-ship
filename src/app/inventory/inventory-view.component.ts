import { Component, Input } from '@angular/core';
import { Apollo } from 'angular2-apollo';

import { client } from '../apollo-client-init';
import { ProductShortComponent } from '../product/product-short.component';
import { InventoryViewQuery } from './inventory-view.interface';

import gql from 'graphql-tag';

@Component({
    selector: 'inventory-view',
    template: `
    <div *ngIf="!data.loading">
    	<div *ngFor="let product of data.products">
        	<a [routerLink]="['/products', product.sku]">{{product.name}}</a>
        	<span *ngIf="editable" (click)="delete(product)">Delete</span>
		</div>
    </div>
    `,
    directives: [ProductShortComponent],
})
@Apollo({
  client,
  queries: (component: InventoryViewComponent) => ({
    data: {
      query: gql`
        query getInventory {
          products {
            sku
			name
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
