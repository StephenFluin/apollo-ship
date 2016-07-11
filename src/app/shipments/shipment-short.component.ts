import { Component, Input } from '@angular/core';
import { Shipment, Product } from '../shared/models';
import { InventoryViewComponent } from '../inventory/inventory-view.component';

import { ROUTER_DIRECTIVES } from '@angular/router';

@Component({
  selector: 'shipment-short',
  template: `
    <div><a [routerLink]="['/shipments/',shipment.id]"><strong>{{shipment.name}}</strong></a></div>
    <div>Projected Revenue: {{shipment.revenue/100 | currency:'USD':'true'}}</div>
    <div>Captain: {{shipment.captain}}</div>
    <inventory-view [inventory]="shipment.inventory"></inventory-view>

    `,
  directives: [ROUTER_DIRECTIVES, InventoryViewComponent],
})
export class ShipmentShortComponent {
  @Input() shipment : Shipment;
  constructor() {

  }
}
