export class Product {
  name: string;
  costToManufacture: number;
  retailPrice: number;
  quantity: number;
}

export class Shipment {
  name: string = '';
  captain: string = '';
  skus: string[] = [];

  addProduct({ sku }) {
    if (this.skus.indexOf(sku) === -1) {
      this.skus.push(sku);
    }
  }

  removeProduct({ sku }) {
    const i = this.skus.indexOf(sku);
    if (i > -1) {
      this.skus.splice(i, 1);
    }
  }
}
