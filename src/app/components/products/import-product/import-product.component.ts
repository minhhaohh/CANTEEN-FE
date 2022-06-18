import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

import { Product } from './../../../models/product.model';
import { ImportProduct } from './../../../models/import-product.model';
import { ProductRepositoryService } from './../../../shared/services/product-repository.service';
import { ImportProductRepositoryService } from './../../../shared/services/import-product-repository.service';

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
    'importDate',
    'supName',
  ];

  myProduct = new Product();
  myImportProduct = new ImportProduct();

  constructor(
    private productRepo: ProductRepositoryService,
    private importProductRepo: ImportProductRepositoryService
  ) {}

  ngOnInit(): void {
    this.getAllProducts();
    this.getAllImportProducts();
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

  getAllImportProducts() {
    this.importProductRepo
      .getAllImportProducts('api/import-product')
      .subscribe((res: any) => {
        this.dataSourceImportProduct.data = res as ImportProduct[];
      });
  }
}
