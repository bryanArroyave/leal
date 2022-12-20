import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListProductsComponent } from './components/list-products/list-products.component';

@NgModule({
  declarations: [ListProductsComponent],
  imports: [CommonModule],
  exports: [ListProductsComponent],
})
export class ProductModule {}
