'use strict';

const knex = require('./knex');

class Products {
  all() {
    return knex('products');
  }

  single(id) {
    return knex('products').where('id', id);
  }

  of(shipmentId) {
    return knex
      .select('products.*')
      .from('shipment_products')
      .leftJoin('products', function() {
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
