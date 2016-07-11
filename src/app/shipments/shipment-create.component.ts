import { Component } from '@angular/core';
import { Shipment } from '../shared/models';
import { InventoryViewComponent } from '../inventory/inventory-view.component';
import { Router } from '@angular/router';
import { Apollo } from 'angular2-apollo';
import gql from 'graphql-tag';
import { GraphQLResult } from 'graphql';
import { client } from '../apollo-client-init';

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
@Apollo({
  client,
  mutations(component: ShipmentCreateComponent) {
    return {
      add: () => ({
        mutation: gql`
          mutation addShipment(
            $name: String!
            $captain: String!
            $inventory: Product[]!
          ) {
            addShipment(
              name: $name
              captain: $captain
              inventory: $inventory
            ) {
              id
            }
          }
        `,
        variables: component.shipment
      })
    };
  }
})
export class ShipmentCreateComponent {
  shipment : Shipment;
  add: () => Promise<GraphQLResult>;

  constructor(private router : Router ) {
    this.shipment = new Shipment(Math.round(Math.random()*100000));
  }

  save() {
    this.add();
    this.router.navigateByUrl('/');
  }
}
