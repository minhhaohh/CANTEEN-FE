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

  chartGroupByProduct: any;
  canvasGroupByProduct: any;
  ctxGroupByProduct: any;
  typeGroupByProduct: string = 'polarArea';
  labelsGroupByProduct = [];
  datasGroupByProduct = [];

  chartGroupByImportDate: any;
  canvasGroupByImportDate: any;
  ctxGroupByImportDate: any;
  typeGroupByImportDate: string = 'bar';
  labelsGroupByImportDate = [];
  datasGroupByImportDate = [];

  public dataSourceImportProduct = new MatTableDataSource<ImportProduct>();

  public displayedColumnsImportProduct = [
    'proId',
    'proName',
    'importQty',
    'importPayment',
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
    console.log(document.querySelector('#chart-by-product'));
  }

  ngAfterViewInit(): void {
    this.dataSourceImportProduct.sort = this.sort;
    this.dataSourceImportProduct.paginator = this.paginator;
    console.log(document.getElementById('chart-by-product'));
  }

  getAllImportProducts() {
    this.importProductRepo
      .getAllImportProducts('api/import-product')
      .subscribe((res: any) => {
        this.dataSourceImportProduct.data = res as ImportProduct[];
        const groupByProduct = this.groupBy(
          this.dataSourceImportProduct.data,
          'proName'
        );
        Object.keys(groupByProduct).forEach((key) => {
          this.labelsGroupByProduct.push(key);
          var total = 0;
          groupByProduct[key].forEach((ord) => (total += ord.importPayment));
          this.datasGroupByProduct.push(total);
        });
        this.canvasGroupByProduct = document.getElementById('chart-by-product');
        this.ctxGroupByProduct = this.canvasGroupByProduct.getContext('2d');
        this.createChart(
          this.chartGroupByProduct,
          this.ctxGroupByProduct,
          this.typeGroupByProduct,
          this.labelsGroupByProduct,
          this.datasGroupByProduct
        );

        const groupByImportDate = this.groupBy(
          this.dataSourceImportProduct.data,
          'importDate'
        );
        Object.keys(groupByImportDate).forEach((key) => {
          this.labelsGroupByImportDate.push(
            this.formatDate.dateToDateString(new Date(key))
          );
          var total = 0;
          groupByImportDate[key].forEach((ord) => (total += ord.importPayment));
          this.datasGroupByImportDate.push(total);
        });
        this.canvasGroupByImportDate = document.getElementById(
          'chart-by-import-date'
        );
        this.ctxGroupByImportDate =
          this.canvasGroupByImportDate.getContext('2d');
        this.createChart1(
          this.chartGroupByImportDate,
          this.ctxGroupByImportDate,
          this.typeGroupByImportDate,
          this.labelsGroupByImportDate,
          this.datasGroupByImportDate
        );
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
        this.dataSourceImportProduct.data = res as ImportProduct[];

        this.labelsGroupByProduct = [];
        this.datasGroupByProduct = [];

        const groupByProduct = this.groupBy(
          this.dataSourceImportProduct.data,
          'proName'
        );
        Object.keys(groupByProduct).forEach((key) => {
          this.labelsGroupByProduct.push(key);
          var total = 0;
          groupByProduct[key].forEach((ord) => (total += ord.importPayment));
          this.datasGroupByProduct.push(total);
        });
        this.canvasGroupByProduct = document.getElementById('chart-by-product');
        this.ctxGroupByProduct = this.canvasGroupByProduct.getContext('2d');
        this.createChart(
          this.chartGroupByProduct,
          this.ctxGroupByProduct,
          this.typeGroupByProduct,
          this.labelsGroupByProduct,
          this.datasGroupByProduct
        );

        this.labelsGroupByImportDate = [];
        this.datasGroupByImportDate = [];

        const groupByImportDate = this.groupBy(
          this.dataSourceImportProduct.data,
          'importDate'
        );
        Object.keys(groupByImportDate).forEach((key) => {
          this.labelsGroupByImportDate.push(
            this.formatDate.dateToDateString(new Date(key))
          );
          var total = 0;
          groupByImportDate[key].forEach((ord) => (total += ord.importPayment));
          this.datasGroupByImportDate.push(total);
        });
        this.canvasGroupByImportDate = document.getElementById(
          'chart-by-import-date'
        );
        this.ctxGroupByImportDate =
          this.canvasGroupByImportDate.getContext('2d');
        this.createChart1(
          this.chartGroupByImportDate,
          this.ctxGroupByImportDate,
          this.typeGroupByImportDate,
          this.labelsGroupByImportDate,
          this.datasGroupByImportDate
        );
      });
  }

  exportExcel() {
    this.importProductRepo
      .exportExcel('api/import-product/ExportToExcel')
      .subscribe((res: any) => {
        console.log(res);
        let fileName = res.headers
          .get('content-disposition')
          ?.split(';')[1]
          .split('=')[1];
        let blob: Blob = res.body as Blob;
        let a = document.createElement('a');
        a.download = fileName;
        a.href = window.URL.createObjectURL(blob);
        a.click();
      });
  }

  groupBy(xs, key) {
    return xs.reduce(function (rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  }

  createChart(
    mychart: any,
    myCtx: any,
    myType: any,
    myLabels: any,
    myDatas: any
  ) {
    mychart = new Chart(myCtx, {
      type: myType,
      data: {
        labels: myLabels,
        datasets: [
          {
            label: 'Product',
            data: myDatas,
            backgroundColor: [
              'rgba(255, 99, 132, 0.5)',
              'rgba(54, 162, 235, 0.5)',
              'rgba(255, 206, 86, 0.5)',
              'rgba(75, 192, 192, 0.5)',
              'rgba(153, 102, 255, 0.5)',
              'rgba(255, 159, 64, 0.5)',
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
        legend: {
          display: true,
        },
        responsive: true,
        display: true,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }
  createChart1(
    mychart: any,
    myCtx: any,
    myType: any,
    myLabels: any,
    myDatas: any
  ) {
    mychart = new Chart(myCtx, {
      type: myType,
      data: {
        labels: myLabels,
        datasets: [
          {
            label: 'Import Product',
            data: myDatas,
            backgroundColor: [
              'rgba(255, 99, 132, 0.5)',
              'rgba(54, 162, 235, 0.5)',
              'rgba(255, 206, 86, 0.5)',
              'rgba(75, 192, 192, 0.5)',
              'rgba(153, 102, 255, 0.5)',
              'rgba(255, 159, 64, 0.5)',
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
        legend: {
          display: true,
        },
        responsive: true,
        display: true,
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
    });
  }
}
