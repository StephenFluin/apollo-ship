import { Component, Input } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { Apollo } from 'angular2-apollo';

import { client } from '../apollo-client-init';
import { ShipmentMapComponent } from './shipment-map.component';
import { InventoryViewComponent } from '../inventory/inventory-view.component';
import { ShipmentDetailsQuery } from './shipment-details.interface';
import { shipmentInfoFragment } from '../shared/fragments';

import gql from 'graphql-tag';

@Component({
  selector: 'shipment-details',
  template: `
    <div *ngIf="data.shipment && !data.loading">
        <h2 *ngIf="!link">{{ data.shipment.name }}</h2>
        <h2 *ngIf="link"><a [routerLink]="['/shipments', shipmentId]">{{ data.shipment.name }}</a></h2>
        <shipment-map *ngIf="map" [shipmentId]="shipmentId" [latitude]="lat" [longitude]="lng"></shipment-map>

        <div>Projected Revenue: {{ data.shipment.revenue/100 | currency: 'USD' : 'true' }}</div>
        <div>Captain: {{ data.shipment.captain }}</div>
        <inventory-view [shipmentId]="shipmentId" [editable]="editable"></inventory-view>
    </div>
    <div *ngIf="!data.shipment && !data.loading">No shipment found with the provided id.</div>
    `,
  directives: [ROUTER_DIRECTIVES, ShipmentMapComponent, InventoryViewComponent],
})
@Apollo({
  client,
  queries: (component: ShipmentDetailsComponent) => ({
    data: {
      query: gql`
        query getShipment($id: String!) {
          shipment(id: $id) {
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
export class ShipmentDetailsComponent {
  @Input() shipmentId: string;
  @Input() map: boolean = true;
  @Input() editable: boolean = true;
  @Input() link: boolean = false;

  lat: number = 37.418901;
  lng: number =  -122.079767;

  data: ShipmentDetailsQuery;
}
