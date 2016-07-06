import { EventEmitter } from '@angular/core';
import { Observable } from "rxjs/Rx";
import { Shipment } from './models';

export class ShipmentService {
    list : Shipment[];
    shipments : Observable<Shipment[]>;
        
    constructor() {
        this.list = [
            new Shipment(1),
            new Shipment(2),
            new Shipment(33),
            new Shipment(35),
            new Shipment(36),
            new Shipment(37),
        ];
        this.shipments =  Observable.of(this.list);
    }
        
        
    getList() : Observable<Shipment[]> {
        return this.shipments;
    }
    get(id: string): Observable<Shipment> {
        return this.getList().map(list => 
            list.find(item => item.id === id)
        );
        
    }
    add(item : Shipment) {
        //this.shipments(item)
        
        this.shipments;
        
    }
    
}

