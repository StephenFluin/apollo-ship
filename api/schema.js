const Shipment = require('./mocks').Shipment;
const Product = require('./mocks').Product;
const knex = require('./knex');

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
      return knex
        .select()
        .table('shipments');
    },
    shipment(_, args) {
      return knex
        .select()
        .table('shipments')
        .where('id', args.id)
        .first();
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

      return knex
        .select(['revenue'])
        .table('shipments').then((shipments) => {
          shipments.reduce((previous, current) => current.revenue + previous, 0);
        });
    }
  },
  Mutation: {
    addShipment(_, args) {

      var shipment = new Shipment;
      shipment.name = args.name;
      shipment.captain = args.captain;

      var locations = {
        origin: null,
        destination: null,
        currentLocation: null,
      };

      return Promise.all([
        // Origin
        knex('locations')
          .insert(shipment.origin)
          .then((result) => {
            locations.origin = result[0];
          }),
        // Destination
        knex('locations')
          .insert(shipment.destination)
          .then((result) => {
            locations.destination = result[0];
          }),
        // CurrentLocation
        knex('locations')
          .insert(shipment.currentLocation)
          .then((result) => {
            locations.currentLocation = result[0];
          })
      ]).then(() => {
        return knex('shipments')
          .insert({
            name: shipment.name,
            captain: shipment.captain,
            revenue: shipment.getRevenue(),
            origin: locations.origin,
            destination: locations.destination,
            current_location: locations.currentLocation,
          });
      });

      //shipment.inventory = args.skus.map((sku) => {
      //  return new Product(sku);
      //});
      //
      //return shipment;
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
    origin: (_, args) => getLocation('origin', args.id || _.id),
    destination: (_, args) => getLocation('destination', args.id || _.id),
    currentLocation: (_, args) => getLocation('current_location', args.id || _.id),
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


function getLocation(type, id) {
  return knex
    .select(['locations.latitude', 'locations.longitude'])
    .table('shipments')
    .leftJoin('locations', 'shipments.' + type, 'locations.id')
    .where('id', id)
    .first()
    .then((result) => {
      console.log(result);
      return result;
    });
}
