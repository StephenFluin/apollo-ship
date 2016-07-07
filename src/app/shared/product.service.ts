import { EventEmitter } from '@angular/core';
import { Observable } from "rxjs/Rx";
import { Product } from './models';

export class ProductService {
    products : Product[];
        
    constructor() {
        this.products = [
            {name:"Worthless Cargo",sku:''+Math.round(Math.random()*100000),costToManufacture:2,retailPrice:3,quantity:Math.round(Math.random()*1000)},
            {name:"Precious Cargo",sku:''+Math.round(Math.random()*10000000),costToManufacture:39900,retailPrice:49900,quantity:1},
            {name:"Consumer Goods",sku:''+Math.round(Math.random()*10000000),costToManufacture:3699,retailPrice:4900,quantity:10},

        ];
    }
        
        
    getList() : Product[] {
        return this.products;
    }
    get(sku: string): Product {
        return this.products.find(item => item.sku === sku);
        
        
    }
    add(item : Product) {
        //this.products(item)
        
        this.products.push(item);
        
    }
    
}

