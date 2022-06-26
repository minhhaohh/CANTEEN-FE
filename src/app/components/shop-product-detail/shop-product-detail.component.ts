import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Product } from './../../models/product.model';
import { ProductRepositoryService } from './../../shared/services/product-repository.service';

@Component({
  selector: 'app-shop-product-detail',
  templateUrl: './shop-product-detail.component.html',
  styleUrls: ['./shop-product-detail.component.css'],
})
export class ShopProductDetailComponent implements OnInit {
  myProduct = new Product();
  proId: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private productRepo: ProductRepositoryService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.proId = Number(params.proId);
    });
    this.selectProduct();
  }

  selectProduct() {
    this.productRepo
      .getProduct(`api/product/${this.proId}`)
      .subscribe((res: any) => {
        this.myProduct = res as Product;
        console.log(this.myProduct);
      });
  }
}
