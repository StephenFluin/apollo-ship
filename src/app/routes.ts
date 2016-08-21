import { RouterConfig } from '@angular/router';

import { HomeComponent } from './home.component';
import { ShipmentViewComponent } from './shipments/shipment-view.component';
import { ShipmentCreateComponent } from './shipments/shipment-create.component';
import { InventoryViewComponent } from './inventory/inventory-view.component';
import { ProductCreateComponent } from './product/product-create.component';
import { ProductViewComponent } from './product/product-view.component';
import { StyleGuideComponent } from './styleguide/styleguide-view.component';


export const routes: RouterConfig = [
  { path: '',                 component: HomeComponent },
  { path: 'shipments/create', component: ShipmentCreateComponent },
  { path: 'shipments/:id',    component: ShipmentViewComponent },
  { path: 'inventory/:id',    component: InventoryViewComponent },
  { path: 'products/create',  component: ProductCreateComponent },
  { path: 'products/:id',     component: ProductViewComponent },
  {path: 'styleguide',        component: StyleGuideComponent}
];
