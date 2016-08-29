import { Component, Injectable } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { MD_BUTTON_DIRECTIVES } from '@angular2-material/button';
import { MdIcon, MdIconRegistry } from '@angular2-material/icon';
import { HTTP_PROVIDERS } from '@angular/http';

@Component({
  selector: 'fab',
  moduleId: module.id,
  template: `
	<md-fab-speed-dial>
		<md-fab-trigger>
			<button md-fab-button>
				<md-icon svgIcon="add"></md-icon>
			</button>
		</md-fab-trigger>
		<md-fab-actions>
			<button md-fab-action [routerLink]="['/shipments/create']">
				<md-icon svgIcon="fab-plane"></md-icon>
			</button>
			<button md-fab-action [routerLink]="['/products/create']">
				<md-icon svgIcon="fab-product"></md-icon>
			</button>
		</md-fab-actions>
	</md-fab-speed-dial>
  `,
  styleUrls: ['home.component.css'],
  directives: [ROUTER_DIRECTIVES, MD_BUTTON_DIRECTIVES, MdIcon],
  providers: [MdIconRegistry]
})

export class FABComponent {
	constructor(mdIconRegistry: MdIconRegistry) {
		mdIconRegistry.addSvgIconSet('app/assets/icon-set.svg');

		System.import('app/assets/js/site.js');
	}



}
