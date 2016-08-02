'use strict';

const ShipmentMock = require('./models/mocks').Shipment;
const ProducttMock = require('./models/mocks').Product;

const schema = [`
  type Location {
    latitude: Float!
    longitude: Float!
  }

  type Product {
    sku: String!
    name: String!
    costToManufacture: Float!
    retailPrice: Float!
    quantity: Int!
  }

  type Shipment {
    id: String!
    name: String!
    revenue: Float
    captain: String
    origin: Location
    destination: Location
    currentLocation: Location
    inventory: [Product]
  }

  type Query {
    # Shipments
    shipments: [Shipment]
    shipment (id: String!): Shipment

    # Products
    products: [Product]
    product (sku: String!): Product

    # Rest
    anticipatedRevenue: Float
  }

  type Mutation {
    addProductsToShipment(
      id: String!,
      skus: [String]!
    ): Shipment

    addProduct(
      name: String!
      costToManufacture: Float!
      retailPrice: Float!
      quantity: Int!
    ): Product
  }

  schema {
    query: Query
    mutation: Mutation
  }
`];

const resolvers = {
  Query: {
    shipments(_, args, context) {
      return context.Shipments.all();
    },
    shipment(_, args, context) {
      return context.Shipments.single(args.id);
    },
    products(_, args, context) {
      return context.Products.all();
    },
    product(_, args, context) {
      return context.Products.single(args.sku);
    },
    anticipatedRevenue(_, args, context){
      return context.Products.revenue();
    }
  },
  Mutation: {
    addProductsToShipment(_, args, context) {
      var id = args.id;
      var skus = args.skus;

      return context.Shipments.create(id, skus);
    },
    addProduct(_, args, context) {
      return context.Products
        .create(args)
        .then((sku) => {
          return context.Products.single(sku)
            .then((result) => result[0])
        });
    }
  },
  Shipment: {
    origin: (_, args, context) => context.Shipments.origin(_.origin),
    destination: (_, args, context) => context.Shipments.destination(_.destination),
    currentLocation: (_, args, context) => context.Shipments.currentLocation(_.currentLocation),
    inventory: (_, args, context) => context.Products.of(_.id),
  },
  Product: {
    costToManufacture: property('cost_to_manufacture'),
    retailPrice: property('retail_price'),
  }
};

module.exports = {
  schema,
  resolvers
};

function property(key) {
  return (o) => o[key];
}
