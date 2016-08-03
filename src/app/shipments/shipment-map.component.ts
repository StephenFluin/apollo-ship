import { Component, Input } from '@angular/core';
import { GOOGLE_MAPS_DIRECTIVES } from 'angular2-google-maps/core';
import { Apollo } from 'angular2-apollo';

import { client } from '../apollo-client-init';
import { ShipmentMapQuery } from './shipment-map.interface';

import gql from 'graphql-tag';

@Component({
  selector: 'shipment-map',
  template: `
    <sebm-google-map *ngIf="data.shipment" [latitude]="latitude" [longitude]="longitude" style="height:300px;">
      <sebm-google-map-marker
        [latitude]="data.shipment.origin.latitude"
        [longitude]="data.shipment.origin.longitude"
        [title]="data.shipment.name"
        label="O">
      </sebm-google-map-marker>
      <sebm-google-map-marker
        [latitude]="data.shipment.currentLocation.latitude"
        [longitude]="data.shipment.currentLocation.longitude"
        [title]="data.shipment.name"
        label="C">
      </sebm-google-map-marker>
      <sebm-google-map-marker
        [latitude]="data.shipment.destination.latitude"
        [longitude]="data.shipment.destination.longitude"
        [title]="data.shipment.name"
        label="D">
      </sebm-google-map-marker>
    </sebm-google-map>
    `,
  directives: [
    GOOGLE_MAPS_DIRECTIVES
  ],
})
@Apollo({
  client,
  queries: (component: ShipmentMapComponent) => ({
    data: {
      query: gql`
        query getShipment($id: String!) {
          shipment(id: $id) {
            name
            origin {
              latitude
              longitude
            }
            currentLocation {
              latitude
              longitude
            }
            destination {
              latitude
              longitude
            }
          }
        }
      `,
      variables: {
        id: component.shipmentId
      }
    }
  })
})
export class ShipmentMapComponent {
  @Input() shipmentId: string;
  @Input() latitude: number;
  @Input() longitude: number;

  data: ShipmentMapQuery
}
