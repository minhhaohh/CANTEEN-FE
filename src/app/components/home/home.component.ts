import { Component, OnInit } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Chart } from 'chart.js';

import { FormatDate } from './../../shared/common/format-date';

import { Order } from './../../models/order.model';
import { ImportProduct } from './../../models/import-product.model';
import { OrderRepositoryService } from './../../shared/services/order-repository.service';
import { ImportProductRepositoryService } from './../../shared/services/import-product-repository.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  totalIn: number = 0;
  totalOut: number = 0;

  formatDate = new FormatDate();

  dateFrom = new Date();
  dateTo = new Date();

  datepickerFrom: NgbDateStruct = this.formatDate.dateToNgbDateStruct(
    this.dateFrom
  );

  datepickerTo: NgbDateStruct = this.formatDate.dateToNgbDateStruct(
    this.dateTo
  );

  orders: Order[];

  chartOrder: any;
  canvasOrder: any;
  ctxOrder: any;
  labelOrder: string = 'Order Payment';
  typeOrder: string = 'bar';
  labelsOrder = [];
  datasOrder = [];

  importProducts: ImportProduct[];

  chartImportProduct: any;
  canvasImportProduct: any;
  ctxImportProduct: any;
  labelImportProduct: string = 'Import Payment';
  typeImportProduct: string = 'bar';
  labelsImportProduct = [];
  datasImportProduct = [];

  constructor(
    private orderRepo: OrderRepositoryService,
    private importProductRepo: ImportProductRepositoryService
  ) {}

  ngOnInit(): void {
    this.getAllOrders();
    this.getAllImportProducts();
  }

  getAllOrders() {
    this.orderRepo.getAllOrders('api/order').subscribe((res: any) => {
      this.orders = res as Order[];
      this.labelsOrder = [];
      this.datasOrder = [];
      const group = this.groupBy(this.orders, 'createdDate');
      Object.keys(group).forEach((key) => {
        this.labelsOrder.push(this.formatDate.dateToDateString(new Date(key)));
        var total = 0;
        group[key].forEach((ord) => (total += ord.totalPayment));
        this.datasOrder.push(total);
        this.totalIn += total;
      });
      this.canvasOrder = document.getElementById('chart-order');
      this.ctxOrder = this.canvasOrder.getContext('2d');
      this.createChart(
        this.chartOrder,
        this.ctxOrder,
        this.labelOrder,
        this.typeOrder,
        this.labelsOrder,
        this.datasOrder
      );
    });
  }

  getAllImportProducts() {
    this.importProductRepo
      .getAllImportProducts('api/import-product')
      .subscribe((res: any) => {
        console.log(res);
        this.importProducts = res as ImportProduct[];
        const groupByImportDate = this.groupBy(
          this.importProducts,
          'importDate'
        );
        Object.keys(groupByImportDate).forEach((key) => {
          this.labelsImportProduct.push(
            this.formatDate.dateToDateString(new Date(key))
          );
          var total = 0;
          groupByImportDate[key].forEach((ord) => (total += ord.importPayment));
          this.datasImportProduct.push(total);
          this.totalOut += total;
        });
        this.canvasImportProduct = document.getElementById(
          'chart-import-product'
        );
        this.ctxImportProduct = this.canvasImportProduct.getContext('2d');
        this.createChart(
          this.chartImportProduct,
          this.ctxImportProduct,
          this.labelImportProduct,
          this.typeImportProduct,
          this.labelsImportProduct,
          this.datasImportProduct
        );
      });
  }

  getDataFromDateToDate() {
    this.getOrdersFromDateToDate();
    this.getImportProductssFromDateToDate();
  }

  getOrdersFromDateToDate() {
    var fromDate = this.formatDate.ngbDateStructToDateString(
      this.datepickerFrom
    );
    var toDate = this.formatDate.ngbDateStructToDateString(this.datepickerTo);
    this.orderRepo
      .getOrdersBy(`api/order/GetOrdersFromDateToDate/${fromDate}/${toDate}`)
      .subscribe((res: any) => {
        this.orders = res as Order[];

        this.labelsOrder = [];
        this.datasOrder = [];
        const group = this.groupBy(this.orders, 'createdDate');
        Object.keys(group).forEach((key) => {
          this.labelsOrder.push(
            this.formatDate.dateToDateString(new Date(key))
          );
          var total = 0;
          group[key].forEach((ord) => (total += ord.totalPayment));
          this.datasOrder.push(total);
        });
        this.canvasOrder = document.getElementById('chart-order');
        this.ctxOrder = this.canvasOrder.getContext('2d');
        this.createChart(
          this.chartOrder,
          this.ctxOrder,
          this.labelOrder,
          this.typeOrder,
          this.labelsOrder,
          this.datasOrder
        );
      });
  }

  getImportProductssFromDateToDate() {
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
        this.importProducts = res as ImportProduct[];

        this.labelsImportProduct = [];
        this.datasImportProduct = [];

        const groupByImportDate = this.groupBy(
          this.importProducts,
          'importDate'
        );
        Object.keys(groupByImportDate).forEach((key) => {
          this.labelsImportProduct.push(
            this.formatDate.dateToDateString(new Date(key))
          );
          var total = 0;
          groupByImportDate[key].forEach((ord) => (total += ord.importPayment));
          this.datasImportProduct.push(total);
        });
        this.canvasImportProduct = document.getElementById(
          'chart-import-product'
        );
        this.ctxImportProduct = this.canvasImportProduct.getContext('2d');
        this.createChart(
          this.chartImportProduct,
          this.ctxImportProduct,
          this.labelImportProduct,
          this.typeImportProduct,
          this.labelsImportProduct,
          this.datasImportProduct
        );
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
    mylabel: any,
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
            label: mylabel,
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
