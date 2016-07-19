import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { Apollo } from 'angular2-apollo';

import { client } from '../apollo-client-init';
import { ShipmentDetailsComponent } from './shipment-details.component';
import { ShipmentsListQuery } from './shipments-list.interface';

import gql from 'graphql-tag';

@Component({
  selector: 'shipments-list',
  template: `
    <div *ngIf="!data.loading">
      <div *ngFor="let shipment of data.shipments">
        <shipment-details
          [shipmentId]="shipment.id"
          [map]="false"
          [editable]="false"
          [link]="true">
        </shipment-details>
      </div>
    </div>
    `,
  directives: [
    ROUTER_DIRECTIVES,
    ShipmentDetailsComponent
  ],
})
@Apollo({
  client,
  queries: () => ({
    data: {
      query: gql`
        query getShipments {
          shipments {
            id
          }
        }
      `
    }
  })
})
export class ShipmentsListComponent {
  data: ShipmentsListQuery;
}
