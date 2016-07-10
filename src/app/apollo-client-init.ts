import ApolloClient, { createNetworkInterface } from 'apollo-client';

// Polyfill fetch
import 'whatwg-fetch';

export const client = new ApolloClient({
  networkInterface: createNetworkInterface('http://localhost:8080/', {
    credentials: 'same-origin',
  }),
  shouldBatch: true,
});
