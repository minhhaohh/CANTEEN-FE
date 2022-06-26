import { Component, OnInit } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';

import { OrderDetail } from './../../models/order-detail.model';
import { CartService } from './../../shared/services/cart.service';

@Component({
  selector: 'app-shop-cart',
  templateUrl: './shop-cart.component.html',
  styleUrls: ['./shop-cart.component.css'],
})
export class ShopCartComponent implements OnInit {
  public dataSourceOrderDetail = new MatTableDataSource<OrderDetail>();
  orderDetails: OrderDetail[] = [];
  totalPayment: number = 0;

  public displayedColumnsOrderDetail = [
    'image',
    'proName',
    'price',
    'qty',
    'amount',
  ];
  constructor(private cart: CartService) {}

  ngOnInit(): void {
    this.orderDetails = this.cart.getorderDetails();
    this.dataSourceOrderDetail.data = this.orderDetails;
    this.getTotal();
  }

  getTotal() {
    this.totalPayment = this.orderDetails.reduce(
      (pre, curr) => pre + curr.amount,
      0
    );
  }

  selectRow(row) {
    var selectOrderDetail = row as OrderDetail;
    this.orderDetails.find(
      (orderDetail) => orderDetail.proId === selectOrderDetail.proId
    ).qty = selectOrderDetail.qty;
    this.orderDetails.find(
      (orderDetail) => orderDetail.proId === selectOrderDetail.proId
    ).amount = selectOrderDetail.qty * selectOrderDetail.price;
    this.getTotal();
  }
}
