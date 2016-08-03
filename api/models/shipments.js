'use strict';

const FlightAware = require('./flightaware');
const ShipmentMock = require('./mocks').Shipment;
const fake = require('casual');
const knex = require('./knex');

class Shipments {
  constructor() {
    this.flightAware = new FlightAware();
  }

  create(shipmentId, products) {
    return Promise.all(products.map((sku) => {
      return knex('shipment_products').insert({
        shipment_id: shipmentId,
        product_sku: sku
      });
    })).then(() => this.single(shipmentId));
  }

  all() {
    return this.flightAware.flights().then((flights) => flights.map(this._flightToShipment));
    return [
      this._flightToShipment(mock()),
      this._flightToShipment(mock()),
      this._flightToShipment(mock()),
      this._flightToShipment(mock()),
      this._flightToShipment(mock()),
      this._flightToShipment(mock()),
    ];
  }

  single(id) {
    return this.flightAware.flight(id).then(this._flightToShipment);
  }

  origin(airportCode) {
    return mockLocation();
    return this.flightAware.airportLocation(airportCode);
  }

  destination(airportCode) {
    return mockLocation();
    return this.flightAware.airportLocation(airportCode);
  }

  currentLocation(ident) {
    return mockLocation();
    return this.flightAware.flightLocation(ident);
  }

  _flightToShipment(flight) {
    const mock = new ShipmentMock();

    return {
      id: flight.ident,
      name: 'Flight ' + flight.ident,
      revenue: mock.getRevenue(),
      captain: flight.aircrafttype,
      origin: flight.origin,
      destination: flight.destination,
      currentLocation: flight.ident
    };
  }
}

function mock() {
  return {
    ident: fake.word + fake.integer(10, 99),
    aircrafttype: fake.word + fake.integer(100, 1000)
  };
}

function mockLocation() {
  return {
    latitude: 37.77469 + Math.random() * 1 - 0.5,
    longitude: -122.415463 + Math.random() * 1 - 0.5
  };
}

module.exports = Shipments;
