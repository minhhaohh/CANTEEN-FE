import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { Chart } from 'chart.js';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

import { FormatDate } from './../../../shared/common/format-date';

import { ImportProduct } from './../../../models/import-product.model';
import { ImportProductRepositoryService } from './../../../shared/services/import-product-repository.service';

@Component({
  selector: 'app-import-product-report',
  templateUrl: './import-product-report.component.html',
  styleUrls: ['./import-product-report.component.css'],
})
export class ImportProductReportComponent implements OnInit, AfterViewInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  formatDate = new FormatDate();

  @ViewChild('myChart', { static: true }) elemento: ElementRef;

  public dataSourceImportProduct = new MatTableDataSource<ImportProduct>();

  public displayedColumnsImportProduct = [
    'proId',
    'proName',
    'importQty',
    'importDate',
    'supName',
  ];

  myImportProduct = new ImportProduct();

  dateFrom = new Date();
  dateTo = new Date();

  datepickerFrom: NgbDateStruct = this.formatDate.dateToNgbDateStruct(
    this.dateFrom
  );

  datepickerTo: NgbDateStruct = this.formatDate.dateToNgbDateStruct(
    this.dateTo
  );

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
        // const myLabels = this.dataSourceImportProduct.data.map(
        //   (order) => order.proName
        // );
        // const myDatas = this.dataSourceImportProduct.data.map(
        //   (order) => order.importPayment
        // );
        const groupForProduct = this.groupBy(
          this.dataSourceImportProduct.data,
          'proName'
        );
        const myLabelsForProductGroup = [];
        const myDatasForProductGroup = [];
        Object.keys(groupForProduct).forEach((key) => {
          myLabelsForProductGroup.push(key);
          var total = 0;
          groupForProduct[key].forEach((ord) => (total += ord.importPayment));
          myDatasForProductGroup.push(total);
        });
        console.log(myLabelsForProductGroup);
        console.log(myDatasForProductGroup);
        this.createChartForProduct(
          myLabelsForProductGroup,
          myDatasForProductGroup
        );

        const groupForImportDate = this.groupBy(
          this.dataSourceImportProduct.data,
          'importDate'
        );
        // const myLabelsForImportDateGroup = [];
        // const myDatasForImportDateGroup = [];
        // Object.keys(groupForImportDate).forEach((key) => {
        //   myLabelsForImportDateGroup.push(
        //     this.formatDate.dateToDateString(new Date(key))
        //   );
        //   var total = 0;
        //   groupForImportDate[key].forEach(
        //     (ord) => (total += ord.importPayment)
        //   );
        //   myDatasForImportDateGroup.push(total);
        // });
        // console.log(myLabelsForImportDateGroup);
        // console.log(myDatasForImportDateGroup);
        // this.createChartForImportDate(
        //   myLabelsForImportDateGroup,
        //   myDatasForImportDateGroup
        // );
      });
  }

  getImportProductsFromDateToDate() {
    var fromDateString = this.formatDate.ngbDateStructToDateString(
      this.datepickerFrom
    );
    var toDateString = this.formatDate.ngbDateStructToDateString(
      this.datepickerTo
    );
    this.importProductRepo
      .getImportProductsBy(
        `api/import-product/GetImportProductsFromDateToDate/${fromDateString}/${toDateString}`
      )
      .subscribe((res: any) => {
        console.log(res);
        this.dataSourceImportProduct.data = res as ImportProduct[];
      });
  }

  groupBy(xs, key) {
    return xs.reduce(function (rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  }

  createChartForProduct(myLabels: any, myDatas: any) {
    const myChart = new Chart(this.elemento.nativeElement, {
      type: 'polarArea',
      data: {
        labels: myLabels,
        datasets: [
          {
            label: 'Product',
            data: myDatas,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }

  // createChartForImportDate(myLabels: any, myDatas: any) {
  //   const myChart2 = new Chart(this.elemento.nativeElement, {
  //     type: 'bar',
  //     data: {
  //       labels: myLabels,
  //       datasets: [
  //         {
  //           label: 'Import Payment',
  //           data: myDatas,
  //           backgroundColor: [
  //             'rgba(255, 99, 132, 0.2)',
  //             'rgba(54, 162, 235, 0.2)',
  //             'rgba(255, 206, 86, 0.2)',
  //             'rgba(75, 192, 192, 0.2)',
  //             'rgba(153, 102, 255, 0.2)',
  //             'rgba(255, 159, 64, 0.2)',
  //           ],
  //           borderColor: [
  //             'rgba(255, 99, 132, 1)',
  //             'rgba(54, 162, 235, 1)',
  //             'rgba(255, 206, 86, 1)',
  //             'rgba(75, 192, 192, 1)',
  //             'rgba(153, 102, 255, 1)',
  //             'rgba(255, 159, 64, 1)',
  //           ],
  //           borderWidth: 1,
  //         },
  //       ],
  //     },
  //     options: {
  //       scales: {
  //         y: {
  //           beginAtZero: true,
  //         },
  //       },
  //     },
  //   });
  // }
}
