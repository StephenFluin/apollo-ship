import { Component } from '@angular/core';
import { MdIconRegistry } from '@angular2-material/icon';

@Component({
  selector: 'styleguide',
  templateUrl: 'styleguide.component.html',
  styleUrls: ['styleguide.component.scss'],
})

export class StyleGuideComponent {
	title = "Styleguide";

	lat: number = 37.418901;
    lng: number =  -122.079767;

	constructor(mdIconRegistry: MdIconRegistry) {
		mdIconRegistry.addSvgIconSet('app/assets/icon-set.svg');
	}


}
