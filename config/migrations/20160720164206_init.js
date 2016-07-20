
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('shipments', function (table) {
      table.increments();
      table.timestamps();
      table.string('posted_by');
      table.text('content');
      table.string('repository_name');
      /*name: String!
      revenue: Float
      captain: String
      origin: Location
      destination: Location
      currentLocation: Location
      inventory: [Product]*/
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('comments'),
    knex.schema.dropTable('entries'),
    knex.schema.dropTable('votes'),
  ]);
};
