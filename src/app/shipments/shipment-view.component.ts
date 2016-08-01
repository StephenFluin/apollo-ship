import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ShipmentDetailsComponent } from './shipment-details.component';

@Component({
  selector: 'shipment-view',
  template: `
    <shipment-details *ngIf="id" [shipmentId]="id"></shipment-details>
  `,
  directives: [ShipmentDetailsComponent],
})
export class ShipmentViewComponent {
  id: string;

  constructor(route: ActivatedRoute) {
    route.params.subscribe((params: any) => {
      this.id = params.id;
    });
  }
}
