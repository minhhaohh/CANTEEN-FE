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

import { Order } from './../../../models/order.model';
import { OrderRepositoryService } from './../../../shared/services/order-repository.service';

@Component({
  selector: 'app-order-report',
  templateUrl: './order-report.component.html',
  styleUrls: ['./order-report.component.css'],
})
export class OrderReportComponent implements OnInit, AfterViewInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  @ViewChild('myChart', { static: true }) elemento: ElementRef;

  public dataSourceOrder = new MatTableDataSource<Order>();

  public displayedColumnsOrder = [
    'orderId',
    'createdDate',
    'totalPayment',
    'isDelivery',
    'status',
  ];

  myOrder = new Order();

  constructor(private orderRepo: OrderRepositoryService) {}

  ngOnInit(): void {
    this.createChart();
    this.getAllOrders();
  }

  ngAfterViewInit(): void {
    this.dataSourceOrder.sort = this.sort;
    this.dataSourceOrder.paginator = this.paginator;
  }

  getAllOrders() {
    this.orderRepo.getAllOrders('api/order').subscribe((res: any) => {
      this.dataSourceOrder.data = res as Order[];
    });
  }

  createChart() {
    const myChart = new Chart(this.elemento.nativeElement, {
      type: 'bar',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [
          {
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
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
}
