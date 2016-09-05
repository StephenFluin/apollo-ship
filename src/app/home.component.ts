import { Component } from '@angular/core';
import { MdIconRegistry } from '@angular2-material/icon';

@Component({
  selector: 'home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.scss'],
})

export class HomeComponent {
  lat: number = 37.418901;
  lng: number =  -122.079767;



	constructor(mdIconRegistry: MdIconRegistry) {
		mdIconRegistry.addSvgIconSet('app/assets/icon-set.svg');
	}



}
