const apolloServer = require('apollo-server').apolloServer;
const cors = require('cors');
const express = require('express');

const schema = require('./schema').schema;
const resolvers = require('./schema').resolvers;

const app = express().use('*', cors());

app.use('/graphql', apolloServer({
  schema,
  resolvers,
  graphiql: true
}));

app.listen('8080', () => console.log('GraphQL is running | localhost:8080/graphql'));
