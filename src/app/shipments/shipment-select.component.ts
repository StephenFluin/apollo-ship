import { Component, Output, EventEmitter } from '@angular/core';
import { Apollo } from 'angular2-apollo';

import { client } from '../apollo-client-init';
import { Shipment, ShipmentSelectQuery } from './shipment-select.interface';

import { MdIcon, MdIconRegistry } from '@angular2-material/icon';
import { MdRadioModule } from '@angular2-material/radio';

import gql from 'graphql-tag';

@Component({
    selector: 'shipment-select',
    template: `
      <div *ngIf="data.loading">...</div>
      <div *ngIf="!data.loading">
		<md-expansion-panel>
			<md-panel-select (click)="isOpen = !isOpen">
		  		<span md-panel-title>Depart from</span>
				<md-icon svgIcon="arrow" [class.open]="isOpen"></md-icon>
			</md-panel-select>
			<md-panel-options [class.open]="isOpen">
				<md-radio-group [(value)]="groupValue">
					<md-radio-button *ngFor="let shipment of data.shipments" [value]="shipment.name">
						{{ shipment.originName }}
					</md-radio-button>
	          	</md-radio-group>
			</md-panel-options>
		</md-expansion-panel>

      </div>
    `,
	styleUrls: ['../home.component.scss'],
})
@Apollo({
  client,
  queries: (component: ShipmentSelectComponent) => ({
    data: {
      query: gql`
        query getShipments {
          shipments {
            id
            name
			originName
			destinationName
          }
        }
      `
    }
  })
})
export class ShipmentSelectComponent {
  @Output() select: EventEmitter<any> = new EventEmitter();
  @Output() deselect: EventEmitter<any> = new EventEmitter();

  data: ShipmentSelectQuery;
  selected: Shipment;

  isOpen: boolean;

  constructor(mdIconRegistry: MdIconRegistry) {
	  mdIconRegistry.addSvgIconSet('app/assets/icon-set.svg');
  }

  _select(shipment): void {
    this.selected = shipment;
    this.select.emit(shipment);
  }

  _deselect(): void {
    this.selected = null;
    this.deselect.emit(null);
  }

  _toggle(shipment): void {
    if (this.selected === shipment) {
      this._deselect();
    } else {
      if (this.selected) {
        this._deselect();
      }

      this._select(shipment);
    }
  }
}
