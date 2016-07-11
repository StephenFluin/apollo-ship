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
        name: 'Worthless Cargo',
        sku: '' + Math.round(Math.random()*100000),
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

function Product() {
  this.name = 'Precious Cargo';
  this.sku = '' + Math.round(Math.random()*10000000);
  this.costToManufacture = 399;
  this.retailPrice = 499;
  this.quantity = 1;
}

module.exports = {
  Shipment,
  Product
};
