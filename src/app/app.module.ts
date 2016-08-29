import { NgModule, CUSTOM_ELEMENTS_SCHEMA }       from '@angular/core';
import { BrowserModule  } from '@angular/platform-browser';
import { AppComponent }   from './app.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { routes } from './routes';
import { GOOGLE_MAPS_PROVIDERS, provideLazyMapsAPILoaderConfig } from 'angular2-google-maps/core';
import { HttpModule } from '@angular/http';

import { MdButtonModule } from '@angular2-material/button';
import { MdCardModule } from '@angular2-material/card';
import { MdInputModule } from '@angular2-material/input';
import { MdToolbarModule } from '@angular2-material/toolbar';
import { MdRadioModule } from '@angular2-material/radio';

import { HomeComponent } from './home.component';
import { ShipmentViewComponent } from './shipments/shipment-view.component';
import { ShipmentCreateComponent } from './shipments/shipment-create.component';
import { InventoryViewComponent } from './inventory/inventory-view.component';
import { ProductCreateComponent } from './product/product-create.component';
import { ProductViewComponent } from './product/product-view.component';

import { HeaderComponent } from './header.component';
import { FABComponent } from './fab.component';

import { StyleGuideComponent } from './styleguide/styleguide-view.component';

import { InventorySelectComponent } from './inventory/inventory-select.component';
import { ShipmentSelectComponent } from './shipments/shipment-select.component';
import { ShipmentMapComponent } from './shipments/shipment-map.component';
import { ShipmentsMapComponent } from './shipments/shipments-map.component';
import { ShipmentDetailsComponent } from './shipments/shipment-details.component';
import { ShipmentsListComponent } from './shipments/shipments-list.component';
import { RevenueReportComponent } from './shipments/revenue-report.component';
import { ShipmentShortWithDataComponent } from './shipments/shipment-short-with-data.component';
import { ShipmentShortComponent } from './shipments/shipment-short.component';
import { ShipmentSimpleComponent } from './shipments/shipment-simple.component';
import { ProductDetailsComponent } from './product/product-details.component';
import { ProductShortComponent } from './product/product-short.component';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
		HeaderComponent,
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
		ShipmentSimpleComponent,
        ProductDetailsComponent,
        ProductShortComponent,
		StyleGuideComponent,
		FABComponent
    ],
    imports:      [
        BrowserModule,
		HttpModule,
        RouterModule.forRoot(routes),
        FormsModule,
        MdButtonModule,
        MdCardModule,
        MdInputModule,
        MdToolbarModule,
		MdRadioModule
    ],
    bootstrap:    [AppComponent],
    providers: [
        GOOGLE_MAPS_PROVIDERS,
		provideLazyMapsAPILoaderConfig({apiKey: 'AIzaSyDftIJkiHomAKsBYJp823yKFyc6ii-GM1U'})
	],
    //schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
