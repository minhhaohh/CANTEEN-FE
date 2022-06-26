import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

import { Order } from './../../models/order.model';
import { OrderDetail } from './../../models/order-detail.model';
import { OrderRepositoryService } from './../../shared/services/order-repository.service';
import { OrderDetailRepositoryService } from './../../shared/services/order-detail-repository.service';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.css'],
})
export class DeliveryComponent implements OnInit, AfterViewInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  myOrder = new Order();

  public dataSourceOrder = new MatTableDataSource<Order>();
  public dataSourceOrderDetail = new MatTableDataSource<OrderDetail>();

  public displayedColumnsOrder = [
    'orderId',
    'createdDate',
    'totalPayment',
    'cusName',
    'cusPhone',
    'cusEmail',
    'deliveryAddress',
    'note',
  ];

  public displayedColumnsOrderDetail = [
    'orderId',
    'proName',
    'price',
    'qty',
    'amount',
  ];

  constructor(
    private orderRepo: OrderRepositoryService,
    private orderDetailRepo: OrderDetailRepositoryService
  ) {}

  ngOnInit(): void {
    this.getOrdersNeedDeliver();
  }

  ngAfterViewInit(): void {
    this.dataSourceOrder.sort = this.sort;
    this.dataSourceOrder.paginator = this.paginator;
  }

  getOrdersNeedDeliver() {
    this.orderRepo
      .getAllOrders('api/order/GetOrdersNeedDeliver')
      .subscribe((res: any) => {
        this.dataSourceOrder.data = res as Order[];
      });
  }

  selectOrder(selectedOrder) {
    this.orderDetailRepo
      .getOrderDetails(`api/order-detail/${selectedOrder.orderId}`)
      .subscribe((res: any) => {
        this.myOrder = selectedOrder;
        this.dataSourceOrderDetail.data = res as OrderDetail[];
      });
  }

  setStatusOrder(status: string) {
    this.myOrder.status = status;
    this.orderRepo
      .updateOrder(`api/order/${this.myOrder.orderId}`, this.myOrder)
      .subscribe((res: any) => {
        console.log(res);
        this.getOrdersNeedDeliver();
      });
  }
}
