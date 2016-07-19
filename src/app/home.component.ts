import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

import { ShipmentsMapComponent } from './shipments/shipments-map.component';
import { ShipmentsListComponent } from './shipments/shipments-list.component';
import { RevenueReportComponent } from './shipments/revenue-report.component';

@Component({
  selector: 'home',
  template: `
    <h2>Map</h2>
    <shipments-map [latitude]="lat" [longitude]="lng"></shipments-map>

    <h2>Shipments List</h2>
    <shipments-list></shipments-list>

    <h2>Anticipated Revenue</h2>
    <revenue-report></revenue-report>

    <h2>New Shipment</h2>
    <button [routerLink]="['/shipments/create']">Create Shipment</button>

    <h2>New Product</h2>
    <button [routerLink]="['/products/create']">Create Product</button>
    `,
  directives: [
    ROUTER_DIRECTIVES,
    ShipmentsMapComponent,
    RevenueReportComponent,
    ShipmentsListComponent
  ],
})
export class HomeComponent {
  lat: number = 37.418901;
  lng: number =  -122.079767;
}
