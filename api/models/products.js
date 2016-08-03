'use strict';

const knex = require('./knex');

class Products {
  create(product) {
    const sku = '' + Math.round(Math.random()*10000000);

    return knex('products').insert({
      sku,
      name: product.name,
      cost_to_manufacture: product.costToManufacture,
      retail_price: product.retailPrice,
      quantity: product.quantity,
    }).then(() => {
      return sku;
    });
  }

  all() {
    return knex('products');
  }

  single(sku) {
    return knex('products').where('sku', sku).first();
  }

  of(shipmentId) {
    return knex
      .select('products.*')
      .from('shipment_products')
      .innerJoin('products', function() {
        this
          .on('products.sku', '=', 'shipment_products.product_sku')
          .andOn('shipment_products.shipment_id', '=', shipmentId);
      });
  }

  revenue() {
    return knex
      .select(['products.retail_price', 'products.quantity'])
      .from('shipment_products')
      .leftJoin('products', 'products.sku', 'shipment_products.product_sku')
      .then((result) => {
        return result
          .map((p) => p.retail_price * p.quantity)
          .reduce((previous, current) => current + previous, 0);
      });
  }
}

module.exports = Products;
