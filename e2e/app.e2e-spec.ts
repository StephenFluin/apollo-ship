import { ApolloShipPage } from './app.po';

describe('apollo-ship App', function() {
  let page: ApolloShipPage;

  beforeEach(() => {
    page = new ApolloShipPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
