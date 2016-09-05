import { Component } from '@angular/core';
import { MdIconRegistry } from '@angular2-material/icon';

@Component({
  selector: 'main-header',
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
  styleUrls: ['home.component.scss'],
})

export class HeaderComponent {

	constructor(mdIconRegistry: MdIconRegistry) {
		mdIconRegistry.addSvgIconSet('app/assets/icon-set.svg');
	}



}
