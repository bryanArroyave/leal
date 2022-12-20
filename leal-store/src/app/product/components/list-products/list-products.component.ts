import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormatService } from 'src/app/services/format.service';
import Product from '../../models/Product';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.scss'],
})
export class ListProductsComponent implements OnInit {
  @Input() clientId: string;

  public products$: Observable<Product[]>;

  constructor(
    private readonly productService: ProductService,
    private readonly formatter: FormatService
  ) {}

  ngOnInit(): void {
    this.products$ = this.productService.getProducts();
  }

  formatValue(value: number) {
    return this.formatter.formatCurrency(value);
  }

  buy(productId: string) {
    this.productService.buy(productId, { clientId: this.clientId }).subscribe();
  }
}
