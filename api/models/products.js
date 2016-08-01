'use strict';

const ProductMock = require('./mocks').Product;

class Products {
  all() {
    return [
      new ProductMock,
      new ProductMock,
      new ProductMock
    ];
  }

  single(id) {
    return new ProductMock(id);
  }
}

module.exports = Products;
