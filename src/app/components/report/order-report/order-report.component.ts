import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { Chart } from 'chart.js';

import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

import { FormatDate } from './../../../shared/common/format-date';

import { Order } from './../../../models/order.model';
import { OrderRepositoryService } from './../../../shared/services/order-repository.service';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-order-report',
  templateUrl: './order-report.component.html',
  styleUrls: ['./order-report.component.css'],
})
export class OrderReportComponent implements OnInit, AfterViewInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  formatDate = new FormatDate();

  chartOrder: any;
  canvasOrder: any;
  ctxOrder: any;
  typeOrder: string = 'bar';
  labelsOrder = [];
  datasOrder = [];

  public dataSourceOrder = new MatTableDataSource<Order>();

  public displayedColumnsOrder = [
    'orderId',
    'createdDate',
    'totalPayment',
    'isDelivery',
    'cusName',
  ];

  myOrder = new Order();

  dateFrom = new Date();
  dateTo = new Date();

  datepickerFrom: NgbDateStruct = this.formatDate.dateToNgbDateStruct(
    this.dateFrom
  );

  datepickerTo: NgbDateStruct = this.formatDate.dateToNgbDateStruct(
    this.dateTo
  );

  constructor(private orderRepo: OrderRepositoryService) {}

  ngOnInit(): void {
    this.getAllOrders();
  }

  ngAfterViewInit(): void {
    this.dataSourceOrder.sort = this.sort;
    this.dataSourceOrder.paginator = this.paginator;
  }

  getAllOrders() {
    this.orderRepo.getAllOrders('api/order').subscribe((res: any) => {
      this.dataSourceOrder.data = res as Order[];
      const group = this.groupBy(this.dataSourceOrder.data, 'createdDate');
      Object.keys(group).forEach((key) => {
        this.labelsOrder.push(this.formatDate.dateToDateString(new Date(key)));
        var total = 0;
        group[key].forEach((ord) => (total += ord.totalPayment));
        this.datasOrder.push(total);
      });
      this.canvasOrder = document.getElementById('chart-order');
      this.ctxOrder = this.canvasOrder.getContext('2d');
      this.createChart(
        this.chartOrder,
        this.ctxOrder,
        this.typeOrder,
        this.labelsOrder,
        this.datasOrder
      );
    });
  }

  getOrdersFromDateToDate() {
    var fromDate = this.formatDate.ngbDateStructToDateString(
      this.datepickerFrom
    );
    var toDate = this.formatDate.ngbDateStructToDateString(this.datepickerTo);
    this.orderRepo
      .getOrdersBy(`api/order/GetOrdersFromDateToDate/${fromDate}/${toDate}`)
      .subscribe((res: any) => {
        this.dataSourceOrder.data = res as Order[];

        this.labelsOrder = [];
        this.datasOrder = [];
        const group = this.groupBy(this.dataSourceOrder.data, 'createdDate');
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
          this.typeOrder,
          this.labelsOrder,
          this.datasOrder
        );
      });
  }

  exportExcel() {
    this.orderRepo
      .exportExcel('api/order/ExportToExcel')
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
            label: 'Total Payment',
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
