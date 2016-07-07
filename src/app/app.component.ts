import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { ShipmentService } from './shared/shipment.service';
import { InventoryService } from './shared/inventory.service';
import { ProductService } from './shared/product.service';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  directives: [ROUTER_DIRECTIVES],
  providers: [ ShipmentService, InventoryService, ProductService ], 
})
export class AppComponent {
  title = 'ApolloShip';
}
