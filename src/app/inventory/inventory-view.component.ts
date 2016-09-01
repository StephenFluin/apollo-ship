import { Component, Input } from '@angular/core';
import { Apollo } from 'angular2-apollo';

import { client } from '../apollo-client-init';
import { ProductShortComponent } from '../product/product-short.component';
import { InventoryViewQuery } from './inventory-view.interface';

import { MdIcon, MdIconRegistry } from '@angular2-material/icon';
import { MD_LIST_DIRECTIVES } from '@angular2-material/list';

import gql from 'graphql-tag';

@Component({
	moduleId: module.id,
    selector: 'inventory-view',
    template: `
	<span class="subtitle">Products</span>
    <md-list *ngIf="!data.loading" class="inventory-list">
    	<md-list-item *ngFor="let product of data.products" [routerLink]="['/products', product.sku]">
        		{{product.name}}
        		<button md-icon-button (click)="delete(product)" *ngIf="editable">
					<md-icon svgIcon="delete"></md-icon>
				</button>
		</md-list-item>
    </md-list>
    `,
	styleUrls: ['../home.component.css'],
    directives: [ProductShortComponent, MdIcon, MD_LIST_DIRECTIVES],
    providers: [MdIconRegistry]
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

	constructor(mdIconRegistry: MdIconRegistry) {
  	  mdIconRegistry.addSvgIconSet('app/assets/icon-set.svg');
    }

    delete(product) {
      // this.inventory.splice(this.inventory.indexOf(item), 1);
    }
    add(product) {
      // this.inventory.push(item);
    }
}
