import { Component } from '@angular/core';
import { MdIconRegistry } from '@angular2-material/icon';

@Component({
  selector: 'fab',
  template: `
	<md-fab-speed-dial>
		<md-fab-trigger>
			<button md-fab-button (click)="isVisible = !isVisible" [class.open]="isVisible">
				<md-icon svgIcon="add"></md-icon>
			</button>
		</md-fab-trigger>
		<md-fab-actions [class.visible]="isVisible">
			<button md-fab-action [routerLink]="['/shipments/create']">
				<md-icon svgIcon="fab-plane"></md-icon>
			</button>
			<button md-fab-action [routerLink]="['/products/create']">
				<md-icon svgIcon="fab-product"></md-icon>
			</button>
		</md-fab-actions>
	</md-fab-speed-dial>
  `,
  styleUrls: ['home.component.scss'],
})

export class FABComponent {
	constructor(mdIconRegistry: MdIconRegistry) {
		mdIconRegistry.addSvgIconSet('app/assets/icon-set.svg');
	}

	isVisible: boolean;
}
