import { Component, Input } from '@angular/core';
import { MapTypeStyle } from 'angular2-google-maps/core';
import { Apollo } from 'angular2-apollo';

import { client } from '../apollo-client-init';
import { ShipmentsMapQuery } from './shipments-map.interface';

import gql from 'graphql-tag';

@Component({
  selector: 'shipments-map',
  template: `
    <sebm-google-map [latitude]="latitude" [longitude]="longitude" [zoom]="9" [styles]="_styler" [disableDefaultUI]="true" style="height:40vh">

      <sebm-google-map-marker *ngFor="let shipment of data.shipments"
        [latitude]="shipment.currentLocation.latitude"
        [longitude]="shipment.currentLocation.longitude"
        [title]="shipment.name"
		[iconUrl]="_iconUrl"
        (markerClick)="selectShipment(shipment.id)">
        <sebm-google-map-info-window>
          <shipment-short-with-data [shipmentId]="shipment.id"></shipment-short-with-data>
        </sebm-google-map-info-window>
      </sebm-google-map-marker>
    </sebm-google-map>
    `,
})
@Apollo({
  client,
  queries: () => ({
    data: {
      query: gql`
        query getShipments {
          shipments {
            id
            name
            currentLocation {
              latitude
              longitude
            }
          }
        }
      `
    }
  })
})
export class ShipmentsMapComponent {

  @Input() latitude: number;
  @Input() longitude: number;
  @Input() style: MapTypeStyle[];
  @Input() disableDefaultUI: boolean;
  @Input() iconUrl: string;
  @Input() zoom: number;

  private _iconUrl: string = "app/assets/pin.svg";


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

  data: ShipmentsMapQuery;

  selectShipment(shipmentId) {
    console.log('Shippment selected:', shipmentId);
  }
}
