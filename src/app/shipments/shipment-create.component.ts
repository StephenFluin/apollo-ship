import { Component } from '@angular/core';
import { Shipment } from '../shared/models';
import { InventoryViewComponent } from '../inventory/inventory-view.component';
import { ShipmentService } from '../shared/shipment.service';
import { Router } from '@angular/router';

@Component({
    selector: 'shipment-create',
    template: `<h2>New Shipment</h2>
    
    
    <div><input [(ngModel)]="shipment.name"></div>
    <div><input [(ngModel)]="shipment.captain"></div>
    <inventory-view [inventory]="shipment.inventory" [editable]="true"></inventory-view>
    <button (click)="save()">Create</button>
    
    `,
    directives: [InventoryViewComponent],
})
export class ShipmentCreateComponent {
    shipment : Shipment;

    constructor(private shipmentService : ShipmentService, private router : Router ) {
        this.shipment = new Shipment(Math.round(Math.random()*100000));
    }
    save() {
        this.shipmentService.add(this.shipment);
        this.router.navigateByUrl('/');
    }
}