import { Component } from '@angular/core';
import { Apollo } from 'angular2-apollo';

import { client } from '../apollo-client-init';
import { ShipmentsListQuery } from './shipments-list.interface';


import gql from 'graphql-tag';

@Component({
  selector: 'shipments-list',
  template: `
  	<md-list>
		<a *ngFor="let shipment of data.shipments" [routerLink]="['/shipments', shipment.id]">
		<md-list-item>
			<shipment-simple [shipmentId]="shipment.id"></shipment-simple>
		</md-list-item>
		</a>
	</md-list>
    `,
	styleUrls: ['../home.component.scss']
})
@Apollo({
  client,
  queries: () => ({
    data: {
      query: gql`
        query getShipments {
          shipments {
            id
          }
        }
      `
    }
  })
})
export class ShipmentsListComponent {
  data: ShipmentsListQuery;
}
