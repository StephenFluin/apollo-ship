const Shipment = require('./mocks').Shipment;
const Product = require('./mocks').Product;

const schema = [`
  type Location {
    latitude: Float!
    longitude: Float!
  }

  type Product {
    name: String!
    sku: String
    costToManufacture: Float
    retailPrice: Float!
    quantity: Int!
  }

  type Shipment {
    id: Int!
    name: String!
    revenue: Float
    captain: String
    origin: Location
    destination: Location
    currentLocation: Location
    inventory: [Product]
  }

  type Query {
    shipments: [Shipment]
    shipment (id: Int!): Shipment
    products: [Product]
  }

  schema {
    query: Query
  }
`];

const resolvers = {
  Query: {
    shipments() {
      return [
        new Shipment,
        new Shipment,
        new Shipment
      ];
    },
    shipment(_, args) {
      return new Shipment(args.id);
    },
    products() {
      return [
        new Product,
        new Product,
        new Product,
        new Product
      ]
    }
  },
  Shipment: {
    revenue: (o) => o.getRevenue(),
    origin: property('origin'),
    destination: property('destination'),
    currentLocation: property('currentLocation'),
    inventory: property('inventory'),
  }
};

function property(key) {
  return (o) => o[key];
}

module.exports = {
  schema,
  resolvers
};
