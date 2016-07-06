import { Component, Input } from '@angular/core';
import { Product } from '../shared/models';

@Component({
    selector: 'inventory-view',
    template: `
    
    <table>
    <tr>
        <th>Name</th><th>SKU</th><th>Cost to Manufacture</th><th>Retail Price</th><th>Quantity</th>
        <th *ngIf="editable"></th></tr>
    <tr *ngFor="let item of inventory">
        <td>{{item.name}}</td>
        <td>{{item.sku}}</td>
        <td>{{item.costToManufacture/100 | currency:'USD':'true'}}</td>
        <td>{{item.retailPrice/100 | currency:'USD':'true'}}</td>
        <td>{{item.quantity}}</td>
        <th *ngIf="editable" (click)="delete(item)">Delete</th>
    </tr>
    </table>
    
    `,
})
export class InventoryViewComponent {
    @Input() inventory : Product[];
    @Input() editable : boolean;
    
    constructor() {
        
    }
    ngOnInit() {
        console.log("editable is",this.editable);
    }
    delete(item) {
        this.inventory.splice(this.inventory.indexOf(item),1);
    }
    add(item) {
        this.inventory.push(item);
    }
}