import { Component } from '@angular/core';
import { Shipment } from '../shared/models';

import { ShipmentDetailsComponent } from './shipment-details.component';
import { InventoryViewComponent } from '../inventory/inventory-view.component';
import { Apollo } from 'angular2-apollo';
import gql from 'graphql-tag';
import { client } from '../apollo-client-init';

import { ActivatedRoute, Router, ROUTER_DIRECTIVES } from '@angular/router';

@Component({
  selector: 'shipment-view',
  template: `
    <shipment-details [shipment]="data.shipment"></shipment-details>

    `,
  directives: [ShipmentDetailsComponent, InventoryViewComponent],
})
@Apollo({
  client,
  queries(component: ShipmentViewComponent) {
    if (component.id) {
      return {
        data: {
          query: gql`
            getShipment($id: Int!) {
              shipment {
                id
                name
                revenue
                origin {
                  latitude
                  longitude
                }
                destination {
                  latitude
                  longitude
                }
                currentLocation {
                  latitude
                  longitude
                }
                captain
                inventory {
                  name
                  sku
                  costToManufacture
                  retailPrice
                  quantity
                }
              }
            }
          `,
          variables: {
            id: component.id,
          }
        }
      };
    }
  }
})
export class ShipmentViewComponent {
  shipment : Shipment;
  id: number;
  data: any;
  constructor(private route : ActivatedRoute) {
    route.params.map(
      params => {
        console.log('Found a shipment!');
        console.log(this.data.shipment);
      }
    ).subscribe(n=>console.log(n));

  }
}
