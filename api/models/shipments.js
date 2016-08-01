'use strict';

const FlightAware = require('./flightaware');
const ShipmentMock = require('./mocks').Shipment;

class Shipments {
  constructor() {
    this.flightAware = new FlightAware();
  }

  all() {
    return this.flightAware.flights().then((flights) => flights.map(this._flightToShipment));
  }

  single(id) {
    return this.flightAware.flight(id).then(this._flightToShipment);
  }

  _flightToShipment(flight) {
    const mock = new ShipmentMock();

    return {
      id: flight.ident,
      name: 'Flight ' + flight.ident,
      revenue: mock.getRevenue(),
      captain: flight.aircrafttype,
      origin: mock.origin,
      destination: mock.destination,
      currentLocation: mock.currentLocation,
      inventory: mock.inventory
    };
  }
}

module.exports = Shipments;
