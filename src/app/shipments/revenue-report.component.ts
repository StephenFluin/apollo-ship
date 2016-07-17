import { Component } from '@angular/core';
import { Apollo, ApolloQuery } from 'angular2-apollo';

import { client } from '../apollo-client-init';

import gql from 'graphql-tag';

@Component({
  selector: 'revenue-report',
  template: `
    <div>{{ data.anticipatedRevenue | currency: 'USD' : true : '1.2-2' }}</div>
    `
})
@Apollo({
  client,
  queries: () => ({
    data: {
      query: gql`
        query getShipmentsRevenue {
          anticipatedRevenue
        }
      `
    }
  })
})
export class RevenueReportComponent {
  data: ApolloQuery;
}
