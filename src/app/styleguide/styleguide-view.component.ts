import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { MD_TOOLBAR_DIRECTIVES } from '@angular2-material/toolbar';
import { MD_BUTTON_DIRECTIVES } from '@angular2-material/button';
import { MD_CARD_DIRECTIVES } from '@angular2-material/card';
import { MD_LIST_DIRECTIVES } from '@angular2-material/list';
import { MdIcon, MdIconRegistry } from '@angular2-material/icon';
import { HTTP_PROVIDERS } from '@angular/http';

@Component({
  selector: 'styleguide',
  moduleId: module.id,
  templateUrl: 'styleguide.component.html',
  styleUrls: ['styleguide.component.css'],
  directives: [ROUTER_DIRECTIVES, MD_TOOLBAR_DIRECTIVES, MD_BUTTON_DIRECTIVES, MD_CARD_DIRECTIVES, MD_LIST_DIRECTIVES, MdIcon],
  providers: [MdIconRegistry]
})

export class StyleGuideComponent {
	title = "Styleguide";

	lat: number = 37.418901;
    lng: number =  -122.079767;

	constructor(mdIconRegistry: MdIconRegistry) {
		mdIconRegistry.addSvgIconSet('app/assets/icon-set.svg');
	}


}
