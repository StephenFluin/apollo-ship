import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { ShipmentService } from './shared/shipment.service';
import { ShipmentShortComponent } from './shipments/shipment-short.component';
import { Observable } from 'rxjs/Rx';
import { Shipment } from './shared/models';


import { GOOGLE_MAPS_DIRECTIVES } from 'angular2-google-maps/core';

@Component({
    selector: 'home',
    template: `
    <h2>Map</h2>
    <sebm-google-map [latitude]="lat" [longitude]="lng" style="height:300px;">
        <sebm-google-map-marker *ngFor="let shipment of shipments | async" 
            [latitude]="shipment.currentLocation.latitude" 
            [longitude]="shipment.currentLocation.longitude"
            [title]="shipment.name"
            (markerClick)="selectShipment(shipment.id)">
            <sebm-google-map-info-window>
                <shipment-short [shipment]="shipment"></shipment-short>
            </sebm-google-map-info-window>
        </sebm-google-map-marker>
        
    </sebm-google-map>
    <div *ngFor="let shipment of shipments | async" >
        
    </div>
    <h2>Anticipated Revenue</h2>
    <div>{{anticipatedRevenue | async | currency:'USD':true:'1.2-2'}}</div>
    <h2>New Shipment</h2>
    <button [routerLink]="['/shipments/create']">Create Shipment</button>
    `,
    directives: [ROUTER_DIRECTIVES, GOOGLE_MAPS_DIRECTIVES, ShipmentShortComponent],
})
export class HomeComponent {
    shipments: Observable<Shipment[]>;
    anticipatedRevenue: Observable<number>;
    
    lat: number = 37.418901;
    lng: number =  -122.079767;
    
    constructor(private shipmentService : ShipmentService) {
        this.shipments = shipmentService.getList();
        this.anticipatedRevenue = shipmentService.getList().map(
            shipments => 
                shipments.reduce(
                    (previous, current) => current.getRevenue() + previous, 0
                )   
        );        
    }
    
    selectShipment(event) {
        console.log("Shippment selected:",event);
    }
}