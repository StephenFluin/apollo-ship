import { Component, Input } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { Apollo } from 'angular2-apollo';

import { MD_LIST_DIRECTIVES } from '@angular2-material/list';
import { MdIcon, MdIconRegistry } from '@angular2-material/icon';

import { client } from '../apollo-client-init';
import { ShipmentSimpleQuery } from './shipment-simple.interface';
import { shipmentInfoFragment } from '../shared/fragments';

import gql from 'graphql-tag';

@Component({
  selector: 'shipment-simple',
  template: `
  	<div *ngIf="data.shipment && !data.loading">
    	<h3 class="md-title" md-line>{{ data.shipment.name }}</h3>
		<p md-line>Captain: {{ data.shipment.captain }}</p>

		<div class="flight" md-line>
  	  		<span>{{ data.shipment.originName }}</span>
  	  		<span class="plane"><md-icon svgIcon="plane"></md-icon></span>
  	  		<span>{{ data.shipment.destinationName }}</span>
    	</div>
	</div>
    `,
	styleUrls: ['app/home.component.css'],
	directives: [ROUTER_DIRECTIVES, MD_LIST_DIRECTIVES, MdIcon],
    providers: [MdIconRegistry]
})
@Apollo({
  client,
  queries: (component: ShipmentSimpleComponent) => ({
    data: {
      query: gql`
        query getShipment($id: String!) {
          shipment(id: $id) {
            #...shipmentInfo
            name
            captain
			originName
			destinationName
          }
        }
      `,
      variables: {
        id: component.shipmentId
      },
      //fragments: shipmentInfoFragment
    }
  })
})
export class ShipmentSimpleComponent {
  @Input() shipmentId: string;
  @Input() link: boolean = false;

  lat: number = 37.418901;
  lng: number =  -122.079767;

  data: ShipmentSimpleQuery;

  constructor(mdIconRegistry: MdIconRegistry) {
	  mdIconRegistry.addSvgIconSet('app/assets/icon-set.svg');
  }
}
