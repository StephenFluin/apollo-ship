import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { Apollo } from 'angular2-apollo';

import { client } from '../apollo-client-init';
import { ShipmentsListQuery } from './shipments-list.interface';


import gql from 'graphql-tag';

@Component({
  selector: 'shipments-list',
  template: `
    <div *ngIf="!data.loading" style="display:flex;flex-wrap:wrap;">
      <md-card *ngFor="let shipment of data.shipments" style="margin:16px;width:450px;">
        <shipment-details
          [shipmentId]="shipment.id"
          [map]="false"
          [editable]="false"
          [link]="true">
        </shipment-details>
      </md-card>
    </div>
    `,
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
