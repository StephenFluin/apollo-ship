
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('products', function (table) {
      table.string('sku');
      table.string('name');
      table.float('cost_to_manufacture');
      table.float('retail_price');
      table.integer('quantity');
    }),
    knex.schema.createTable('shipment_products', function (table) {
      table.string('shipment_id')
      table.string('product_sku');
    }),
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('products'),
    knex.schema.dropTable('shipment_products'),
  ]);
};
