import { Component } from '@angular/core';
import { Shipment, Product } from '../shared/models';
import { ShipmentService } from '../shared/shipment.service';
import { Observable } from 'rxjs/Rx';

import { ShipmentDetailsComponent } from './shipment-details.component';
import { InventoryViewComponent } from '../inventory/inventory-view.component';

import { ActivatedRoute, Router, ROUTER_DIRECTIVES } from '@angular/router';

@Component({
    selector: 'shipment-view',
    template: `
    <shipment-details [shipment]="shipment"></shipment-details>
    
    `,
    directives: [ShipmentDetailsComponent, InventoryViewComponent],
})
export class ShipmentViewComponent {
    shipment : Shipment;
    constructor(private route : ActivatedRoute, private shipmentService : ShipmentService) {       
        route.params.map( 
            params => {
                console.log("Found a shipment!");
                this.shipment = shipmentService.get(params['id']);
                console.log(this.shipment);
            }
        ).subscribe(n=>console.log(n));
        
    }
}