import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

import { ImportProduct } from './../../../models/import-product.model';
import { ImportProductRepositoryService } from './../../../shared/services/import-product-repository.service';

@Component({
  selector: 'app-import-product-report',
  templateUrl: './import-product-report.component.html',
  styleUrls: ['./import-product-report.component.css'],
})
export class ImportProductReportComponent implements OnInit {
  model: any;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  public dataSourceImportProduct = new MatTableDataSource<ImportProduct>();

  public displayedColumnsImportProduct = [
    'proId',
    'proName',
    'importQty',
    'importDate',
    'supName',
  ];

  myImportProduct = new ImportProduct();

  constructor(private importProductRepo: ImportProductRepositoryService) {}

  ngOnInit(): void {
    this.getAllImportProducts();
  }

  ngAfterViewInit(): void {
    this.dataSourceImportProduct.sort = this.sort;
    this.dataSourceImportProduct.paginator = this.paginator;
  }

  getAllImportProducts() {
    this.importProductRepo
      .getAllImportProducts('api/import-product')
      .subscribe((res: any) => {
        this.dataSourceImportProduct.data = res as ImportProduct[];
      });
  }
}
