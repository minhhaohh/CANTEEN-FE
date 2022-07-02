import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

import { Product } from './../../../models/product.model';
import { ProductRepositoryService } from './../../../shared/services/product-repository.service';
import { NotificationService } from './../../../shared/services/notification.service';

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

  constructor(
    private productRepo: ProductRepositoryService,
    private noti: NotificationService
  ) {}

  ngOnInit(): void {
    this.getAllProducts();
  }

  ngAfterViewInit(): void {
    this.dataSourceProduct.sort = this.sort;
    this.dataSourceProduct.paginator = this.paginator;
  }

  getAllProducts() {
    this.productRepo.getAllProducts('api/product').subscribe((res: any) => {
      this.dataSourceProduct.data = res as Product[];
    });
  }

  selectProduct(selectedProduct) {
    this.productRepo
      .getProduct(`api/product/${selectedProduct.proId}`)
      .subscribe((res: any) => {
        this.myProduct = res as Product;
      });
  }

  createProduct() {
    this.productRepo.createProduct('api/product', this.myProduct).subscribe(
      (res: any) => {
        this.noti.showSuccess(
          'Created Product Successfully!!!',
          'Success Message'
        );
        this.clearForm();
        this.getAllProducts();
      },
      (error: any) => {
        this.noti.showError(error.error, 'Error Message');
      }
    );
  }

  updateProduct() {
    this.productRepo
      .updateProduct(`api/product/${this.myProduct.proId}`, this.myProduct)
      .subscribe(
        (res: any) => {
          this.noti.showSuccess(
            'Updated Product Successfully!!!',
            'Success Message'
          );
          this.clearForm();
          this.getAllProducts();
        },
        (error: any) => {
          this.noti.showError(error.error, 'Error Message');
        }
      );
  }

  deleteProduct() {
    this.productRepo
      .deleteProduct(`api/product/${this.myProduct.proId}`)
      .subscribe(
        (res: any) => {
          this.noti.showSuccess(
            'Deleted Product Successfully!!!',
            'Success Message'
          );
          this.clearForm();
          this.getAllProducts();
        },
        (error: any) => {
          this.noti.showError(error.error, 'Error Message');
        }
      );
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

  chooseFileImage(event) {
    var path = '../../assets/images/products/';
    var fileName = event.target.files[0].name;
    path += fileName;
    this.myProduct.image = path;
  }
}
