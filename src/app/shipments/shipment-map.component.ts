import { Component, Input } from '@angular/core';
import { MapTypeStyle } from 'angular2-google-maps/core';
import { Apollo } from 'angular2-apollo';

import { client } from '../apollo-client-init';
import { ShipmentMapQuery } from './shipment-map.interface';

import gql from 'graphql-tag';

@Component({
  selector: 'shipment-map',
  template: `
    <sebm-google-map *ngIf="data.shipment" [latitude]="latitude" [longitude]="longitude" [zoom]="9" [styles]="_styler" [disableDefaultUI]="true" style="height:40vh">
      <sebm-google-map-marker
        [latitude]="data.shipment.origin.latitude"
        [longitude]="data.shipment.origin.longitude"
        [title]="data.shipment.name"
		[iconUrl]="originIcon">
      </sebm-google-map-marker>
      <sebm-google-map-marker
        [latitude]="data.shipment.currentLocation.latitude"
        [longitude]="data.shipment.currentLocation.longitude"
        [title]="data.shipment.name"
		[iconUrl]="stopIcon">
      </sebm-google-map-marker>
      <sebm-google-map-marker
        [latitude]="data.shipment.destination.latitude"
        [longitude]="data.shipment.destination.longitude"
        [title]="data.shipment.name"
		[iconUrl]="destIcon">
      </sebm-google-map-marker>
    </sebm-google-map>
    `,
})
@Apollo({
  client,
  queries: (component: ShipmentMapComponent) => ({
    data: {
      query: gql`
        query getShipment($id: String!) {
          shipment(id: $id) {
            name
            origin {
              latitude
              longitude
            }
            currentLocation {
              latitude
              longitude
            }
            destination {
              latitude
              longitude
            }
          }
        }
      `,
      variables: {
        id: component.shipmentId
      }
    }
  })
})
export class ShipmentMapComponent {
  @Input() shipmentId: string;
  @Input() latitude: number;
  @Input() longitude: number;
    @Input() style: MapTypeStyle[];
    @Input() disableDefaultUI: boolean;
    @Input() iconUrl: string;
    @Input() zoom: number;

	private originIcon: string = "app/assets/pin-origin.svg";
	private destIcon: string = "app/assets/pin.svg";
	private stopIcon: string = "app/assets/pin-stop.svg";


  	private _styler: MapTypeStyle[] = [
  	    {
  	        featureType: "water",
  	        elementType: "geometry",
  	        stylers: [
  	            {
  	                color: "#e9e9e9"
  	            },
  	            {
  	                lightness: 17
  	            }
  	        ]
  	    },
  		{
  	        featureType: "landscape",
  	        elementType: "geometry",
  	        stylers: [
  	            {
  	                color: "#f5f5f5"
  	            },
  	            {
  	                lightness: 20
  	            }
  	        ]
  	    },
  		{
  	        featureType: "road.highway",
  	        elementType: "geometry.fill",
  	        stylers: [
  	            {
  	                color: "#ffffff"
  	            },
  	            {
  	                lightness: 17
  	            }
  	        ]
  	    },
  		{
  	        featureType: "road.highway",
  	        elementType: "geometry.stroke",
  	        stylers: [
  	            {
  	                color: "#ffffff"
  	            },
  	            {
  	                lightness: 29
  	            },
  	            {
  	                weight: 0.2
  	            }
  	        ]
  	    },
  		{
  	        featureType: "road.arterial",
  	        elementType: "geometry",
  	        stylers: [
  	            {
  	                color: "#ffffff"
  	            },
  	            {
  	                lightness: 18
  	            }
  	        ]
  	    },
  		{
  	        featureType: "road.local",
  	        elementType: "geometry",
  	        stylers: [
  	            {
  	                color: "#ffffff"
  	            },
  	            {
  	                lightness: 16
  	            }
  	        ]
  	    },
  		{
  	        featureType: "poi",
  	        elementType: "geometry",
  	        stylers: [
  	            {
  	                color: "#f5f5f5"
  	            },
  	            {
  	                lightness: 21
  	            }
  	        ]
  	    },
  		{
  	        featureType: "poi.park",
  	        elementType: "geometry",
  	        stylers: [
  	            {
  	                color: "#dedede"
  	            },
  	            {
  	                lightness: 21
  	            }
  	        ]
  	    },
  		{
  			featureType: "all",
  	        elementType: "labels.text.stroke",
  	        stylers: [
  	            {
  	                visibility: "on"
  	            },
  	            {
  	                color: "#ffffff"
  	            },
  	            {
  	                lightness: 16
  	            }
  	        ]
  	    },
  	    {
  			featureType: "all",
  	        elementType: "labels.text.fill",
  	        stylers: [
  	            {
  	                saturation: 36
  	            },
  	            {
  	                color: "#333333"
  	            },
  	            {
  	                lightness: 40
  	            }
  	        ]
  	    },
  		{
  			featureType: "all",
  	        elementType: "labels.icon",
  	        stylers: [
  	            {
  	                visibility: "off"
  	            }
  	        ]
  	    },
  		{
  	        featureType: "transit",
  	        elementType: "geometry",
  	        stylers: [
  	            {
  	                color: "#f2f2f2"
  	            },
  	            {
  	                lightness: 19
  	            }
  	        ]
  	    },
  		{
  	        featureType: "administrative",
  	        elementType: "geometry.fill",
  	        stylers: [
  	            {
  	                color: "#fefefe"
  	            },
  	            {
  	                lightness: 20
  	            }
  	        ]
  	    },
  		{
  	        featureType: "administrative",
  	        elementType: "geometry.stroke",
  	        stylers: [
  	            {
  	                color: "#fefefe"
  	            },
  	            {
  	                lightness: 17
  	            },
  	            {
  	                weight: 1.2
  	            }
  	        ]
  	    }
  	];

  data: ShipmentMapQuery
}
