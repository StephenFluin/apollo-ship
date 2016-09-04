import { Component, Injectable } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { MD_TOOLBAR_DIRECTIVES } from '@angular2-material/toolbar';
import { MdIcon, MdIconRegistry } from '@angular2-material/icon';
import { HTTP_PROVIDERS } from '@angular/http';

@Component({
  selector: 'main-header',
  moduleId: module.id,
  template: `
	<div class="logo">
		<a [routerLink]="['/']" class="logo-icon">
			<md-icon class="icon-logo" svgIcon="logo"></md-icon>
			<span>ApolloShip</span>
		</a>

		<div class="revenue">
			<span>Anticipated Revenue:</span>
			<revenue-report></revenue-report>
		</div>
	</div>
  `,
  styleUrls: ['home.component.css'],
  directives: [ROUTER_DIRECTIVES, MD_TOOLBAR_DIRECTIVES, MdIcon],
  providers: [MdIconRegistry]
})

export class HeaderComponent {

	constructor(mdIconRegistry: MdIconRegistry) {
		mdIconRegistry.addSvgIconSet('app/assets/icon-set.svg');
	}



}
