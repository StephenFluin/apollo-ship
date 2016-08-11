import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
    selector: 'product-view',
    template: `
      <product-details *ngIf="sku" [sku]="sku"></product-details>
    `,
})
export class ProductViewComponent {
  sku: string;

  constructor(route: ActivatedRoute) {
    route.params.subscribe((params: any) => {
      this.sku = params.id;
    });
  }
}
