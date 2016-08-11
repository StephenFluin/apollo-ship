import { Component } from '@angular/core';

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
    <div class="content">
      <button md-raised-button color="primary" [routerLink]="['/shipments/create']">Create Shipment</button>
    </div>
    <h2>New Product</h2>
    <div class="content">
      <button md-raised-button color="primary" [routerLink]="['/products/create']">Create Product</button>
    </div>
    `,
    
})
export class HomeComponent {
  lat: number = 37.418901;
  lng: number =  -122.079767;
}
