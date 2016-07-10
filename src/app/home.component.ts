import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { ShipmentService } from './shared/shipment.service';
import { ShipmentShortComponent } from './shipments/shipment-short.component';
import { Observable } from 'rxjs/Rx';
import { Shipment } from './shared/models';


import { GOOGLE_MAPS_DIRECTIVES } from 'angular2-google-maps/core';

import { Apollo } from 'angular2-apollo';
import gql from 'graphql-tag';
import { client } from './apollo-client-init';

@Component({
    selector: 'home',
    template: `
    <h2>Map</h2>
    <sebm-google-map [latitude]="lat" [longitude]="lng" style="height:300px;">
        <sebm-google-map-marker *ngFor="let shipment of shipments" 
            [latitude]="shipment.currentLocation.latitude" 
            [longitude]="shipment.currentLocation.longitude"
            [title]="shipment.name"
            (markerClick)="selectShipment(shipment.id)">
            <sebm-google-map-info-window>
                <shipment-short [shipment]="shipment"></shipment-short>
            </sebm-google-map-info-window>
        </sebm-google-map-marker>
        
    </sebm-google-map>
    <div *ngFor="let shipment of shipments" >
        
    </div>
    <h2>Anticipated Revenue</h2>
    <div>{{anticipatedRevenue | currency:'USD':true:'1.2-2'}}</div>
    <h2>New Shipment</h2>
    <button [routerLink]="['/shipments/create']">Create Shipment</button>
    `,
    directives: [ROUTER_DIRECTIVES, GOOGLE_MAPS_DIRECTIVES, ShipmentShortComponent],
})
@Apollo({
  client,
  queries() {
    return {
      shipments: {
        query: gql`
          query getShipments() {
            shipments {
              id
              name
              origin {
                latitude
                longitude
              }
              destination {
                latitude
                longitude
              }
              currentLocation {
                latitude
                longitude
              }
              captain
              inventory {
                name
                sku
                costToManufacture
                retailPrice
                quantity
              }
            }
          }
        `
      }
    };
  }
})
export class HomeComponent {
    shipments: Shipment[];
    anticipatedRevenue: number;

    lat: number = 37.418901;
    lng: number =  -122.079767;

    constructor(private shipmentService : ShipmentService) {
        //this.shipments = shipmentService.getList();
        this.anticipatedRevenue = shipmentService.getList().reduce(
            (previous, current) => current.getRevenue() + previous, 0
        );
    }

    selectShipment(event) {
        console.log("Shippment selected:",event);
    }
}
