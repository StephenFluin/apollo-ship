import { Observable } from "rxjs/Rx";
import { Shipment } from './models';

export class ShipmentService {
    list() : Observable<any[]> {
        return Observable.of([
            new Shipment(1),
            new Shipment(2),
            new Shipment(33)
        ])
    }
    
}

