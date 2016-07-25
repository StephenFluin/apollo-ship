
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('shipments', function (table) {
      table.increments();
      table.string('name');
      table.float('revenue');
      table.string('captain');
      table.integer('origin');
      table.integer('destination');
      table.integer('current_location');
    }),
    knex.schema.createTable('locations', function (table) {
      table.increments();
      table.float('latitude');
      table.float('longitude');
    }),
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('shipments'),
  ]);
};
