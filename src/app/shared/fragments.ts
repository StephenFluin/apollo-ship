import { createFragment } from 'apollo-client';

import gql from 'graphql-tag';

//
// Shipment
//

export interface ShipmentInfo {
  name: string;
  revenue: number;
  captain: string;
}

export const shipmentInfoFragment = createFragment(gql`
  fragment shipmentInfo on Shipment {
    name
    revenue
    captain
  }
`);

//
// Product
//

export interface ProductInfo {
  name: string;
  costToManufacture: number;
  retailPrice: number;
}

export const productInfoFragment = createFragment(gql`
  fragment productInfo on Product {
    name
    costToManufacture
    retailPrice
  }
`);
