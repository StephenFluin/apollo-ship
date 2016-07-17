const Shipment = require('./mocks').Shipment;
const Product = require('./mocks').Product;

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
    # Shipments
    shipments: [Shipment]
    shipment (id: Int!): Shipment

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
    },
    product(_, args) {
      return new Product(args.sku);
    },
    anticipatedRevenue(){
      var randomShipments = [
        new Shipment,
        new Shipment,
        new Shipment
      ];
      return randomShipments.reduce((previous, current) => current.getRevenue() + previous, 0);
    }
  },
  Mutation: {
    addShipment(_, args) {
      var shipment = new Shipment;

      shipment.name = args.name;
      shipment.captain = args.captain;

      shipment.inventory = args.skus.map((sku) => {
        return new Product(sku);
      });ta

      return shipment;
    },
    addProduct(_, args) {
      var product = new Product;

      product.name = args.name;
      product.costToManufacture = args.costToManufacture;
      product.retailPrice = args.retailPrice;
      product.quantity = args.quantity;

      return product;
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
