import { Component, Input } from '@angular/core';
import { Shipment, Product } from '../shared/models';
import { InventoryViewComponent } from '../inventory/inventory-view.component';

import { ROUTER_DIRECTIVES } from '@angular/router';

@Component({
    selector: 'shipment-details',
    template: `
    <div><a [routerLink]="['/shipments/',shipment.id]"><strong>{{shipment.name}}</strong></a></div>
    <div>Projected Revenue: {{shipment.getRevenue()/100 | currency:'USD':'true'}}</div>
    <div>Captain: {{shipment.captain}}</div>
    <inventory-view [inventory]="shipment.inventory" [editable]="true"></inventory-view>

    `,
    directives: [ROUTER_DIRECTIVES, InventoryViewComponent],
})
export class ShipmentDetailsComponent {
    @Input() shipment : Shipment;
    constructor() {
        
    }
}