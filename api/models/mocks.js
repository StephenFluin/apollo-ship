'use strict';

const fake = require('casual');

function Shipment(id) {
  this.id = id ? id : Math.round(Math.random()*1000);

  this.name = `Shipment ${this.id}`;

  this.origin = {
    latitude: 37.418901 + Math.random() * 1 - 0.5,
    longitude: -122.079767 + Math.random() * 1 - 0.5
  };

  this.destination = {
    latitude: 37.77469 + Math.random() * 1 - 0.5,
    longitude: -122.415463 + Math.random() * 1 - 0.5
  };

  this.captain = 'Zol';

  this.currentLocation = {
    latitude: (this.origin.latitude + this.destination.latitude) / 2,
    longitude: (this.origin.longitude + this.destination.longitude) / 2
  };

  this.inventory = [
      new Product(),
      {
        sku: '' + Math.round(Math.random()*100000),
        name: 'Worthless Cargo',
        costToManufacture: 2,
        retailPrice: 3,
        quantity: Math.round(Math.random()*1000)
      }
  ];

  this.getRevenue = () => {
    return this.inventory.reduce(
      (previous, current) => previous + (current.retailPrice * current.quantity), 0
    );
  }
}

function Product(sku) {
  this.name = fake.company_name;
  this.sku = sku ? sku : '' + Math.round(Math.random()*10000000);
  this.costToManufacture = fake.double(50, 500);
  this.retailPrice = this.costToManufacture + fake.double(50, 200);
  this.quantity = fake.integer(1, 10);
}

module.exports = {
  Shipment,
  Product
};
