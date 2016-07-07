import { EventEmitter } from '@angular/core';
import { Observable } from "rxjs/Rx";
import { Shipment } from './models';

export class ShipmentService {
    shipments : Shipment[];
        
    constructor() {
        this.shipments = [
            new Shipment(1),
            new Shipment(2),
            new Shipment(33),
            new Shipment(35),
            new Shipment(36),
            new Shipment(37),
        ];
    }
        
        
    getList() : Shipment[] {
        return this.shipments;
    }
    get(id: string): Shipment {
        return this.shipments.find(item => item.id === id);
        
        
    }
    add(item : Shipment) {
        //this.shipments(item)
        
        this.shipments.push(item);
        
    }
    
}

