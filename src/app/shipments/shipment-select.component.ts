import { Component, Output, EventEmitter } from '@angular/core';
import { Apollo } from 'angular2-apollo';

import { client } from '../apollo-client-init';
import { Shipment, ShipmentSelectQuery } from './shipment-select.interface';

import gql from 'graphql-tag';

@Component({
    selector: 'shipment-select',
    template: `
      <div *ngIf="data.loading">...</div>
      <div *ngIf="!data.loading">
        <div *ngFor="let shipment of data.shipments">
          <input type="radio" [checked]="selected === shipment" (change)="_toggle(shipment)" /> {{shipment.name}}
        </div>
      </div>
    `,
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
