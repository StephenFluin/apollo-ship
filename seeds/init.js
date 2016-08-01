'use strict';

const ProductMock = require('../api/models/mocks').Product;

const products = multiply(() => new ProductMock, 5);

exports.seed = function(knex, Promise) {
  return Promise.all([
    knex('shipment_products').del(),
    knex('products').del()
      .then(function () {
        return Promise.all(products.map((product) => {
          return knex('products').insert({
            sku: product.sku,
            name: product.name,
            cost_to_manufacture: product.costToManufacture,
            retail_price: product.retailPrice,
            quantity: product.quantity
          });
        }));
      }),
  ]);
};

function multiply(fn, times) {
  const result = [];

  while(times-- > 0) {
    result.push(fn());
  }

  return result;
}
