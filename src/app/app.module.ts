import { NgModule, CUSTOM_ELEMENTS_SCHEMA }       from '@angular/core';
import { BrowserModule  } from '@angular/platform-browser';
import { AppComponent }   from './app.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { routes } from './routes';
import { GOOGLE_MAPS_PROVIDERS } from 'angular2-google-maps/core';

import { MdButtonModule } from '@angular2-material/button';
import { MdCardModule } from '@angular2-material/card';
import { MdInputModule } from '@angular2-material/input';
import { MdToolbarModule } from '@angular2-material/toolbar';

import { HomeComponent } from './home.component';
import { ShipmentViewComponent } from './shipments/shipment-view.component';
import { ShipmentCreateComponent } from './shipments/shipment-create.component';
import { InventoryViewComponent } from './inventory/inventory-view.component';
import { ProductCreateComponent } from './product/product-create.component';
import { ProductViewComponent } from './product/product-view.component';

import { InventorySelectComponent } from './inventory/inventory-select.component';
import { ShipmentSelectComponent } from './shipments/shipment-select.component';
import { ShipmentMapComponent } from './shipments/shipment-map.component';
import { ShipmentsMapComponent } from './shipments/shipments-map.component';
import { ShipmentDetailsComponent } from './shipments/shipment-details.component';
import { ShipmentsListComponent } from './shipments/shipments-list.component';
import { RevenueReportComponent } from './shipments/revenue-report.component';
import { ShipmentShortWithDataComponent } from './shipments/shipment-short-with-data.component';
import { ShipmentShortComponent } from './shipments/shipment-short.component';
import { ProductDetailsComponent } from './product/product-details.component';
import { ProductShortComponent } from './product/product-short.component';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        ShipmentCreateComponent,
        ShipmentViewComponent,
        InventoryViewComponent,
        ProductCreateComponent,
        ProductViewComponent,
        InventorySelectComponent, 
        ShipmentSelectComponent,
        ShipmentMapComponent, 
        ShipmentsMapComponent,
        InventoryViewComponent,
        ShipmentDetailsComponent,
        RevenueReportComponent,
        ShipmentsListComponent,    
        ShipmentShortWithDataComponent,
        ShipmentShortComponent,
        ProductDetailsComponent,
        ProductShortComponent
    ],
    imports:      [
        BrowserModule,
        RouterModule.forRoot(routes),
        FormsModule,
        MdButtonModule,
        MdCardModule,
        MdInputModule,
        MdToolbarModule,
    ],
    bootstrap:    [AppComponent],
    providers: [
        GOOGLE_MAPS_PROVIDERS,],
    //schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}