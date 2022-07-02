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
  type: string;
  products: Product[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private productRepo: ProductRepositoryService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.proId = Number(params.proId);
    });
    this.getProduct();
    console.log(this.myProduct);
    this.getRelatedProducts();
  }

  getProduct() {
    this.productRepo
      .getProduct(`api/product/${this.proId}`)
      .subscribe((res: any) => {
        this.myProduct = res as Product;
        this.type = this.myProduct.type;
        console.log(this.myProduct);
      });
  }

  getRelatedProducts() {
    this.productRepo
      .getRelatedProducts(
        `api/product/GetRelatedProducts/${this.myProduct.proId}/${this.myProduct.type}`
      )
      .subscribe((res: any) => {
        console.log(this.myProduct.proId);
        console.log(this.myProduct.type);
        console.log(res);
        this.products = res as Product[];
      });
  }

  addToCart() {}
}
