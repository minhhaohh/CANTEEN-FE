import { Injectable } from '@angular/core';

import { OrderDetail } from './../../models/order-detail.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  orderDetails: OrderDetail[] = [];

  constructor() {}

  addOrderDetail(orderDetail: OrderDetail) {
    this.orderDetails.push(orderDetail);
  }

  getorderDetails() {
    return this.orderDetails;
  }
}
