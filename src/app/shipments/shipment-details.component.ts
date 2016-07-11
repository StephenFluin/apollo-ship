import { Component, Input } from '@angular/core';
import { Shipment, Product } from '../shared/models';
import { InventoryViewComponent } from '../inventory/inventory-view.component';
import { Apollo } from 'angular2-apollo';
import gql from 'graphql-tag';
import { client } from '../apollo-client-init';


import { ROUTER_DIRECTIVES } from '@angular/router';

import { GOOGLE_MAPS_DIRECTIVES } from 'angular2-google-maps/core';

@Component({
  selector: 'shipment-details',
  template: `
    <div *ngIf="shipment">
        <h2>{{shipment.name}}</h2>
        <sebm-google-map [latitude]="lat" [longitude]="lng" style="height:300px;">
            <sebm-google-map-marker
                [latitude]="shipment.origin.latitude"
                [longitude]="shipment.origin.longitude"
                [title]="shipment.name"
                label="O">
            </sebm-google-map-marker>
            <sebm-google-map-marker
                [latitude]="shipment.currentLocation.latitude"
                [longitude]="shipment.currentLocation.longitude"
                [title]="shipment.name"
                label="C">
            </sebm-google-map-marker>
            <sebm-google-map-marker
                [latitude]="shipment.destination.latitude"
                [longitude]="shipment.destination.longitude"
                [title]="shipment.name"
                label="D">
            </sebm-google-map-marker>

        </sebm-google-map>
        <div>Projected Revenue: {{shipment.revenue/100 | currency:'USD':'true'}}</div>
        <div>Captain: {{shipment.captain}}</div>
        <inventory-view [inventory]="shipment.inventory" [editable]="true"></inventory-view>
    </div>
    <div *ngIf="!shipment">No shipment found with the provided id.</div>
    `,
  directives: [ROUTER_DIRECTIVES, InventoryViewComponent, GOOGLE_MAPS_DIRECTIVES],
})
@Apollo({
  client,
  queries: () => ({
    data: {
      query: gql`
        getProducts {
          products {
            name
            sku
            costToManufacture
            retailPrice
            quantity
          }
        }
      `
    }
  })
})
export class ShipmentDetailsComponent {
  @Input() shipment : Shipment;

  lat: number = 37.418901;
  lng: number =  -122.079767;
}
