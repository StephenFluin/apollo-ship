import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Apollo } from 'angular2-apollo';
import { ApolloQueryResult } from 'apollo-client';

import { InventorySelectComponent } from '../inventory/inventory-select.component';
import { ShipmentSelectComponent } from './shipment-select.component';
import { client } from '../apollo-client-init';

import gql from 'graphql-tag';

@Component({
  selector: 'shipment-create',
  template: `
    <h2>New Shipment</h2>
    <shipment-select (select)="onShipmentSelect($event)" (deselect)="onShipmentDeselect($event)"></shipment-select>
    <inventory-select (select)="onProductSelect($event)" (deselect)="onProductDeselect($event)"></inventory-select>
    <button (click)="save()">Create</button>
  `,
  directives: [InventorySelectComponent, ShipmentSelectComponent],
})
@Apollo({
  client,
  mutations(component: ShipmentCreateComponent) {
    return {
      add: () => ({
        mutation: gql`
          mutation addProductsToShipment(
            $id: String!
            $skus: [String]!
          ) {
            addProductsToShipment(
              id: $id
              skus: $skus
            ) {
              id
              inventory {
                sku
              }
            }
          }
        `,
        variables: {
          id: component.selectedShipment,
          skus: Array.from(component.selectedProducts.values()),
        },
      })
    };
  }
})
export class ShipmentCreateComponent {
  selectedShipment: string;
  selectedProducts: Set<string> = new Set<string>();
  add: () => Promise<ApolloQueryResult>;

  constructor(private router: Router ) {}

  save() {
    this.add()
      .then((result) => {
        this.router.navigateByUrl('/');
      })
      .catch((error) => {
        console.log('Error:', error);
      });
  }

  onProductSelect({ sku }) {
    if (!this.selectedProducts.has(sku)) {
      this.selectedProducts.add(sku);
    }
  }

  onProductDeselect({ sku }) {
    this.selectedProducts.delete(sku);
  }

  onShipmentSelect(shipment) {
    this.selectedShipment = shipment.id;
  }

  onShipmentDeselect() {
    this.selectedShipment = null;
  }
}
