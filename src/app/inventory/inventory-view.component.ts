import { Component, Input } from '@angular/core';
import { Product } from '../shared/models';
import { ROUTER_DIRECTIVES } from '@angular/router';

@Component({
    selector: 'inventory-view',
    template: `
    
    <table>
    <tr>
        <th>Name</th><th>SKU</th><th>Cost to Manufacture</th><th>Retail Price</th><th>Quantity</th>
        <th *ngIf="editable"></th></tr>
    <tr *ngFor="let item of inventory" [routerLink]="['/products/',item.sku]">
        <td><a [routerLink]="['/products/',item.sku]">{{item.name}}</a></td>
        <td>{{item.sku}}</td>
        <td>{{item.costToManufacture/100 | currency:'USD':'true'}}</td>
        <td>{{item.retailPrice/100 | currency:'USD':'true'}}</td>
        <td>{{item.quantity}}</td>
        <th *ngIf="editable" (click)="delete(item)">Delete</th>
    </tr>
    </table>
    
    `,
    
    directives: [ ROUTER_DIRECTIVES],
    
})
export class InventoryViewComponent {
    @Input() inventory : Product[];
    @Input() editable : boolean;
    
    constructor() {
        
    }
    delete(item) {
        this.inventory.splice(this.inventory.indexOf(item),1);
    }
    add(item) {
        this.inventory.push(item);
    }
}