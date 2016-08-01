import { Component, Input } from '@angular/core';
import { Apollo } from 'angular2-apollo';

import { client } from '../apollo-client-init';
import { ShipmentShortComponent } from './shipment-short.component';
import { ShipmentShortWithDataQuery } from './shipment-short-with-data.interface';
import { shipmentInfoFragment } from '../shared/fragments';

import gql from 'graphql-tag';

@Component({
  selector: 'shipment-short-with-data',
  template: `
    <shipment-short *ngIf="!data.loading" [shipment]="data.shipment">
  `,
  directives: [ShipmentShortComponent],
})
@Apollo({
  client,
  queries: (component: ShipmentShortWithDataComponent) => ({
    data: {
      query: gql`
        query getShipment($id: String!) {
          shipment(id: $id) {
            id
            #...shipmentInfo
            name
            revenue
            captain
          }
        }
      `,
      variables: {
        id: component.shipmentId
      },
      //fragments: shipmentInfoFragment
    }
  })
})
export class ShipmentShortWithDataComponent {
  @Input() shipmentId: string;

  data: ShipmentShortWithDataQuery;
}
