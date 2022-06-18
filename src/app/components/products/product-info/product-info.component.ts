import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

import { Product } from './../../../models/product.model';
import { ProductRepositoryService } from './../../../shared/services/product-repository.service';

@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.css'],
})
export class ProductInfoComponent implements OnInit, AfterViewInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  public dataSourceProduct = new MatTableDataSource<Product>();

  public displayedColumnsProduct = [
    'proId',
    'proName',
    'price',
    'totalQty',
    'unit',
    'type',
    'image',
  ];

  myProduct = new Product();

  constructor(private repo: ProductRepositoryService) {}

  ngOnInit(): void {
    this.getAllProducts();
  }

  ngAfterViewInit(): void {
    this.dataSourceProduct.sort = this.sort;
    this.dataSourceProduct.paginator = this.paginator;
  }

  getAllProducts() {
    this.repo.getAllProducts('api/product').subscribe((res: any) => {
      this.dataSourceProduct.data = res as Product[];
    });
  }

  selectProduct(selectedProduct) {
    this.repo
      .getProduct(`api/product/${selectedProduct.proId}`)
      .subscribe((res: any) => {
        this.myProduct = res as Product;
      });
  }

  createProduct() {
    this.repo
      .createProduct('api/product', this.myProduct)
      .subscribe((res: any) => {
        this.clearForm();
        this.getAllProducts();
      });
  }

  updateProduct() {
    this.repo
      .updateProduct(`api/product/${this.myProduct.proId}`, this.myProduct)
      .subscribe((res: any) => {
        this.clearForm();
        this.getAllProducts();
      });
  }

  deleteProduct() {
    this.repo
      .deleteProduct(`api/product/${this.myProduct.proId}`)
      .subscribe((res: any) => {
        console.log(res);
        this.clearForm();
        this.getAllProducts();
      });
  }

  clearForm() {
    this.myProduct.proId = null;
    this.myProduct.proName = null;
    this.myProduct.price = null;
    this.myProduct.totalQty = null;
    this.myProduct.unit = null;
    this.myProduct.type = null;
    this.myProduct.image = null;
  }
}
