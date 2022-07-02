import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

import { Product } from './../../../models/product.model';
import { ImportProduct } from './../../../models/import-product.model';
import { Supplier } from './../../../models/supplier.model';
import { ProductRepositoryService } from './../../../shared/services/product-repository.service';
import { ImportProductRepositoryService } from './../../../shared/services/import-product-repository.service';
import { SupplierRepositoryService } from './../../../shared/services/supplier-repository.service';
import { NotificationService } from './../../../shared/services/notification.service';

@Component({
  selector: 'app-import-product',
  templateUrl: './import-product.component.html',
  styleUrls: ['./import-product.component.css'],
})
export class ImportProductComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  public dataSourceProduct = new MatTableDataSource<Product>();
  public dataSourceImportProduct = new MatTableDataSource<ImportProduct>();

  public displayedColumnsProduct = [
    'proId',
    'proName',
    'price',
    'totalQty',
    'unit',
    'type',
  ];

  public displayedColumnsImportProduct = [
    'proId',
    'proName',
    'importQty',
    'unit',
    'importDate',
    'importPayment',
    'supName',
  ];

  myProduct = new Product();
  myImportProduct = new ImportProduct();

  suppliers: Supplier[];

  constructor(
    private productRepo: ProductRepositoryService,
    private importProductRepo: ImportProductRepositoryService,
    private supplierRepo: SupplierRepositoryService,
    private noti: NotificationService
  ) {}

  ngOnInit(): void {
    this.getAllProducts();
    this.getAllImportProducts();
    this.getAllSuppliers();
  }

  ngAfterViewInit(): void {
    this.dataSourceProduct.sort = this.sort;
    this.dataSourceProduct.paginator = this.paginator;
    this.dataSourceImportProduct.sort = this.sort;
    this.dataSourceImportProduct.paginator = this.paginator;
  }

  getAllProducts() {
    this.productRepo.getAllProducts('api/product').subscribe((res: any) => {
      this.dataSourceProduct.data = res as Product[];
    });
  }

  getAllSuppliers() {
    this.supplierRepo.getAllSuppliers('api/supplier').subscribe((res: any) => {
      this.suppliers = res as Supplier[];
    });
  }

  selectProduct(selectedProduct) {
    this.productRepo
      .getProduct(`api/product/${selectedProduct.proId}`)
      .subscribe((res: any) => {
        this.myProduct = res as Product;
      });
  }

  getAllImportProducts() {
    this.importProductRepo
      .getAllImportProducts('api/import-product')
      .subscribe((res: any) => {
        console.log(res);
        this.dataSourceImportProduct.data = res as ImportProduct[];
      });
  }

  createImportProduct() {
    this.myImportProduct.proId = this.myProduct.proId;
    this.importProductRepo
      .createImportProduct('api/import-product', this.myImportProduct)
      .subscribe(
        (res: any) => {
          this.noti.showSuccess(
            'Imported Product Successfully!!!',
            'Success Message'
          );
          this.clearForm();
          this.getAllImportProducts();
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
    this.myImportProduct.proId = null;
    this.myImportProduct.proName = null;
    this.myImportProduct.importQty = null;
    this.myImportProduct.importDate = new Date();
    this.myImportProduct.importPayment = null;
    this.myImportProduct.supId = null;
    this.myImportProduct.supName = null;
  }
}
