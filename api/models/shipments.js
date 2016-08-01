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

  origin(airportCode) {
    return this.flightAware.airportLocation(airportCode);
  }

  destination(airportCode) {
    return this.flightAware.airportLocation(airportCode);
  }

  currentLocation(ident) {
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
      currentLocation: flight.ident,
      inventory: mock.inventory
    };
  }
}

module.exports = Shipments;
