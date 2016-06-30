import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { ShipmentService } from './shared/shipment.service';
import { Observable } from 'rxjs/Rx';
import { Shipment } from './shared/models';

@Component({
    selector: 'home',
    template: `
    <h2>Map</h2>
    <div *ngFor="let shipment of shipments | async" >
        <a [routerLink]="['/shipments/',shipment.id]"> {{shipment.name}}</a>
    </div>
    <h2>Anticipated Revenue</h2>
    <div>{{anticipatedRevenue | async | currency:'USD':true:'1.2-2'}}</div>
    <h2>New Shipment</h2>
    <button [routerLink]="['/shipments/create']">Create Shipment</button>
    `,
    directives: [ROUTER_DIRECTIVES],
})
export class HomeComponent {
    shipments: Observable<Shipment[]>;
    anticipatedRevenue: Observable<number>;
    constructor(private shipmentService : ShipmentService) {
        this.shipments = shipmentService.list();
        this.anticipatedRevenue = shipmentService.list().map(
            shipments => 
                shipments.reduce(
                    (previous, current) => current.getRevenue() + previous, 0
                )   
        );        
    }
}