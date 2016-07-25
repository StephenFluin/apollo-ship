const knex = require('knex');
const development = require('../config/knexfile').development;

module.exports = knex(development);
