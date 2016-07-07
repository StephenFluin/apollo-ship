import { Component, Input } from '@angular/core';
import { Product } from '../shared/models';

@Component({
    selector: 'product-view',
    template: `
    <div>
        <h2>{{product.name}}</h2>
        <div>SKU: {{product.sku}}</div>
        <div>Cost to Manufacture: {{product.costToManufacture/100 | currency:'USD':'true'}}</div>
        <div>Retail Price: {{product.retailPrice/100 | currency:'USD':'true'}}</div>
    </div>
    <fieldset>Other 3rd party information about product:</fieldset>
    
    `,
})
export class ProductViewComponent {
    product : Product;
    
    constructor() {
        this.product = new Product();
    }
}