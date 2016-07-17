import { Component, Input } from '@angular/core';
import { GOOGLE_MAPS_DIRECTIVES } from 'angular2-google-maps/core';
import { Apollo } from 'angular2-apollo';

import { client } from '../apollo-client-init';
import { ShipmentShortWithDataComponent } from './shipment-short-with-data.component';
import { ShipmentsMapQuery } from './shipments-map.interface';

import gql from 'graphql-tag';

@Component({
  selector: 'shipments-map',
  template: `
    <sebm-google-map [latitude]="latitude" [longitude]="longitude" style="height:300px;">
      <sebm-google-map-marker *ngFor="let shipment of data.shipments"
        [latitude]="shipment.currentLocation.latitude"
        [longitude]="shipment.currentLocation.longitude"
        [title]="shipment.name"
        (markerClick)="selectShipment(shipment.id)">
        <sebm-google-map-info-window>
          <shipment-short-with-data [shipmentId]="shipment.id"></shipment-short-with-data>
        </sebm-google-map-info-window>
      </sebm-google-map-marker>
    </sebm-google-map>
    `,
  directives: [
    GOOGLE_MAPS_DIRECTIVES,
    ShipmentShortWithDataComponent
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
            name
            currentLocation {
              latitude
              longitude
            }
          }
        }
      `
    }
  })
})
export class ShipmentsMapComponent {
  @Input() latitude: number;
  @Input() longitude: number;

  data: ShipmentsMapQuery;

  selectShipment(shipmentId) {
    console.log('Shippment selected:', shipmentId);
  }
}
