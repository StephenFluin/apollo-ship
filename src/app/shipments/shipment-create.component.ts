import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Apollo } from 'angular2-apollo';
import { ApolloQueryResult } from 'apollo-client';

import { InventorySelectComponent } from '../inventory/inventory-select.component';
import { Shipment } from '../shared/models';
import { client } from '../apollo-client-init';

import gql from 'graphql-tag';

@Component({
  selector: 'shipment-create',
  template: `
    <h2>New Shipment</h2>

    <div><input [(ngModel)]="shipment.name" placeholder="Name"></div>
    <div><input [(ngModel)]="shipment.captain" placeholder="Captain"></div>

    <inventory-select (add)="onAdd($event)" (remove)="onRemove($event)"></inventory-select>

    <button (click)="save()">Create</button>
  `,
  directives: [InventorySelectComponent],
})
@Apollo({
  client,
  mutations(component: ShipmentCreateComponent) {
    return {
      add: () => ({
        mutation: gql`
          mutation addShipment(
            $name: String!
            $captain: String!
            $skus: [String]!
          ) {
            addShipment(
              name: $name
              captain: $captain
              skus: $skus
            ) {
              id
              inventory {
                sku
              }
            }
          }
        `,
        variables: component.shipment
      })
    };
  }
})
export class ShipmentCreateComponent {
  shipment: Shipment = new Shipment();
  add: () => Promise<ApolloQueryResult>;

  constructor(private router: Router ) {}

  save() {
    this.add()
      .then(() => {
        this.router.navigateByUrl('/');
      })
      .catch((error) => {
        console.log('Error:', error);
      });
  }

  onAdd(product) {
    this.shipment.addProduct(product);
  }

  onRemove(product) {
    this.shipment.removeProduct(product);
  }
}
