'use strict';

const restclient = require('restler');

class FlightAware {
  flights() {
    return this._request('Enroute', {
      airport: 'KSFO',
      howMany: 20,
      filter: 'airline',
      offset: 0
    })
      .then((result) => {
        const flights = result.EnrouteResult.enroute;
        return flights;
      });
  }

  flight(ident) {
    return this._request('FlightInfo', {
      ident,
      howMany: 1
    })
      .then((result) => {
        if(result && result.FlightInfoResult) {
          return result.FlightInfoResult.flights[0];
        }
      });
  }

  flightLocation(ident) {
    return this._request('InFlightInfo', {
      ident
    })
      .then((result) => result.InFlightInfoResult)
      .then(this._getLocation);
  }

  airportLocation(airportCode) {
    return this._request('AirportInfo', {
      airportCode
    })
      .then((result) => result.AirportInfoResult)
      .then(this._getLocation);
  }

  _getLocation(data) {
    return {
      latitude: data.latitude,
      longitude: data.longitude
    };
  }

  _request(type, query) {
    return new Promise((resolve, reject) => {
      restclient.get(FlightAware.url + type, {
        username: FlightAware.username,
        password: FlightAware.apiKey,
        query
      })
        .on('success', (result, response) => {
          resolve(result);
        })
        .on('error', (error) => reject(error))
        .on('fail', (error) => reject(error));
    });
  }
}

FlightAware.url = 'http://flightxml.flightaware.com/json/FlightXML2/';
FlightAware.username = 'kamilkisiela';
FlightAware.apiKey = '--api-key--';
FlightAware.apiKey = '73ac258f4e1d7dd56293462cdac123edf949f6fc';

module.exports = FlightAware;
