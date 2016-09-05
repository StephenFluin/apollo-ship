import { Component, Input } from '@angular/core';
import { Apollo } from 'angular2-apollo';

import { MdIconRegistry } from '@angular2-material/icon';

import { client } from '../apollo-client-init';
import { ShipmentDetailsQuery } from './shipment-details.interface';

import gql from 'graphql-tag';

@Component({
  selector: 'shipment-details',
  templateUrl: 'shipment-details.component.html',
	styleUrls: ['../home.component.scss'],
})
@Apollo({
  client,
  queries: (component: ShipmentDetailsComponent) => ({
    data: {
      query: gql`
        query getShipment($id: String!) {
          shipment(id: $id) {
            name
            revenue
            captain
			originName
			destinationName
			originCode
			destinationCode
          }
        }
      `,
      variables: {
        id: component.shipmentId
      }
    }
  })
})
export class ShipmentDetailsComponent {
  @Input() shipmentId: string;
  @Input() map: boolean = true;
  @Input() editable: boolean = true;
  @Input() link: boolean = false;

  lat: number = 37.418901;
  lng: number =  -122.079767;

  data: ShipmentDetailsQuery;

  constructor(mdIconRegistry: MdIconRegistry) {
	  mdIconRegistry.addSvgIconSet('app/assets/icon-set.svg');
  }
}
