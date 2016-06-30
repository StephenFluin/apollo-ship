import {RouterConfig} from '@angular/router';
import {HomeComponent} from './home.component';
import {ShipmentViewComponent} from './shipment-view.component';
import {ShipmentCreateComponent} from './shipment-create.component';
import {InventoryViewComponent} from './inventory-view.component';


export const routes: RouterConfig = [
    {
        path: '',
        component: HomeComponent,
    },
    { path: 'shipments/create', component: ShipmentCreateComponent},
    { path: 'shipments/:id', component: ShipmentViewComponent},
    { path: 'inventory/:id', component: InventoryViewComponent},
    
];