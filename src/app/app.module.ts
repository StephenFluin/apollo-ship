import { NgModule }       from '@angular/core';
import { BrowserModule  } from '@angular/platform-browser';
import { AppComponent }   from './app.component';
import { RouterModule } from '@angular/router';
import { routes } from './routes';
import {GOOGLE_MAPS_PROVIDERS} from 'angular2-google-maps/core';


@NgModule({
    declarations: [AppComponent],
    imports:      [
        BrowserModule,
        RouterModule.forRoot(routes),
    ],
    bootstrap:    [AppComponent],
    providers: [
  GOOGLE_MAPS_PROVIDERS,]
})
export class AppModule {}