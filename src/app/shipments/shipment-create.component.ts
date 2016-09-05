import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Apollo } from 'angular2-apollo';
import { ApolloQueryResult } from 'apollo-client';

import { client } from '../apollo-client-init';

import gql from 'graphql-tag';

@Component({
  selector: 'shipment-create',
  templateUrl: 'shipment-create.component.html',
  styleUrls: ['../home.component.scss']
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
  
  lat: number = 37.418901;
  lng: number =  -122.079767;

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
