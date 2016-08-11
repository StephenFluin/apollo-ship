import { Component, Input } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

import { ShipmentShort } from './shipment-short.interface';

@Component({
  selector: 'shipment-short',
  template: `
    <div><a [routerLink]="['/shipments', shipment.id]"><strong>{{ shipment.name }}</strong></a></div>
    <div>Projected Revenue: {{ shipment.revenue / 100 | currency: 'USD' : 'true' }}</div>
    <div>Captain: {{ shipment.captain }}</div>
    <inventory-view [shipmentId]="shipment.id" [editable]="false"></inventory-view>
    `,
})
export class ShipmentShortComponent {
  @Input() shipment: ShipmentShort;
}
