var mocks = require('../../api/mocks');

function Shipment(knex, Promise) {
  var shipment = new mocks.Shipment();

  return knex('shipments').insert({
    name: shipment.name,
    captain: shipment.captain,
    revenue: shipment.getRevenue(),
  }).then((result) => {
    var shipmentId = result[0];
    var ids = {
      origin: null,
      destination: null,
      currentLocation: null,
    };

    return Promise.all([
      // Origin
      knex('locations').insert({
        latitude: shipment.origin.latitude,
        longitude: shipment.origin.longitude,
      }).then((result) => {
        ids.origin = result[0];
      }),
      // Destination
      knex('locations').insert({
        latitude: shipment.destination.latitude,
        longitude: shipment.destination.longitude,
      }).then((result) => {
        ids.destination = result[0];
      }),
      // currentLocation
      knex('locations').insert({
        latitude: shipment.currentLocation.latitude,
        longitude: shipment.currentLocation.longitude,
      }).then((result) => {
        ids.currentLocation = result[0];
      }),
    ]).then(() => {
      return knex('shipments')
        .where('id', shipmentId)
        .update({
          origin: ids.origin,
          destination: ids.destination,
          current_location: ids.currentLocation,
        });
    });
  })
}

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return Promise.all([
    knex('locations').del(),
    knex('shipments').del(),
  ])
    .then(function () {
      return Promise.all([
        Shipment(knex, Promise)
      ]);
    });
};
