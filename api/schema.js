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
    addShipment(
      name: String!,
      captain: String!
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
      var randomShipments = context.Shipments.all();

      return randomShipments.reduce((previous, current) => current.revenue + previous, 0);
    }
  },
  Mutation: {
    addShipment(_, args, context) {
      var shipment = new ShipmentMock();
      shipment.name = args.name;
      shipment.captain = args.captain;

      shipment.inventory = args.skus.map((sku) => {
        return context.Products.single(sku);
      });

      return shipment;
    },
    addProduct(_, args, context) {
      var product = new ProducttMock();

      product.name = args.name;
      product.costToManufacture = args.costToManufacture;
      product.retailPrice = args.retailPrice;
      product.quantity = args.quantity;

      return product;
    }
  },
  Shipment: {
    origin: (_, args, context) => context.Shipments.origin(_.origin),
    destination: (_, args, context) => context.Shipments.destination(_.destination),
    currentLocation: (_, args, context) => context.Shipments.currentLocation(_.currentLocation),
    inventory: property('inventory'),
  }
};

module.exports = {
  schema,
  resolvers
};

function property(key) {
  return (o) => o[key];
}
