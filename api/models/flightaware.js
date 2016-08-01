'use strict';

const restclient = require('restler');

class FlightAware {
  flights() {
    return this._request('Enroute', {
      airport: 'KSFO',
      howMany: 20,
      filter: '',
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
    }).then((result) => {
      return result.FlightInfoResult.flights[0];
    });
  }

  location(ident) {
    return this._request('InFlightInfo', {
      ident
    }).then((result) => {
      console.log('InFlightInfo', result);
      return result;
    });
  }

  airport() {

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

module.exports = FlightAware;
