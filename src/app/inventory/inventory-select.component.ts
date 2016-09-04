import { Component, Output, EventEmitter } from '@angular/core';
import { Apollo, ApolloQuery } from 'angular2-apollo';

import { client } from '../apollo-client-init';
import { InventorySelectQuery } from './inventory-select.interface';

import { MdIcon, MdIconRegistry } from '@angular2-material/icon';
import { MdRadioModule } from '@angular2-material/radio';

import gql from 'graphql-tag';

@Component({
	moduleId: module.id,
    selector: 'inventory-select',
    template: `
      <div *ngIf="!data.loading">
        <md-expansion-panel>
			<md-panel-select (click)="isOpen = !isOpen">
		  		<span md-panel-title>With products</span>
				<md-icon svgIcon="arrow" [class.open]="isOpen"></md-icon>
			</md-panel-select>
			<md-panel-options [class.open]="isOpen">
				<md-radio-group [(value)]="groupValue">
					<md-radio-button *ngFor="let product of data.products" [value]="product.sku">
						{{product.name}}
					</md-radio-button>
	          	</md-radio-group>
			</md-panel-options>
		</md-expansion-panel>
      </div>
    `,
	styleUrls: ['../home.component.css'],
	directives: [MdIcon],
	providers: [MdIconRegistry]
})
@Apollo({
  client,
  queries: (component: InventorySelectComponent) => ({
    data: {
      query: gql`
        query getInventory {
          products {
            sku
			name
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
  isOpen: boolean;

  constructor(mdIconRegistry: MdIconRegistry) {
	  mdIconRegistry.addSvgIconSet('app/assets/icon-set.svg');
  }

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
