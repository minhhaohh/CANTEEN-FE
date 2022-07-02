import { Component, OnInit } from '@angular/core';

import { Order } from './../../models/order.model';
import { OrderDetail } from './../../models/order-detail.model';
import { Customer } from './../../models/customer.model';

import { CartService } from './../../shared/services/cart.service';
import { OrderRepositoryService } from './../../shared/services/order-repository.service';
import { OrderDetailRepositoryService } from './../../shared/services/order-detail-repository.service';
import { CustomerRepositoryService } from './../../shared/services/customer-repository.service';
import { NotificationService } from './../../shared/services/notification.service';

@Component({
  selector: 'app-shop-checkout',
  templateUrl: './shop-checkout.component.html',
  styleUrls: ['./shop-checkout.component.css'],
})
export class ShopCheckoutComponent implements OnInit {
  myOrder = new Order();
  orderDetails: OrderDetail[] = [];
  totalPayment: number = 0;

  myUsername: string = localStorage.getItem('username');
  myCustomer = new Customer();

  constructor(
    private cart: CartService,
    private orderRepo: OrderRepositoryService,
    private orderDetailRepo: OrderDetailRepositoryService,
    private customerRepo: CustomerRepositoryService,
    private noti: NotificationService
  ) {}

  ngOnInit(): void {
    this.orderDetails = this.cart.getorderDetails();
    this.getTotal();
    this.getCustomerByUsername();
  }

  getCustomerByUsername() {
    this.customerRepo
      .getCustomer(`api/customer/GetCustomerByUserName/${this.myUsername}`)
      .subscribe((res: any) => {
        console.log(res);
        this.myCustomer = res as Customer;
        this.myOrder.cusName = this.myCustomer.cusName;
        this.myOrder.cusPhone = this.myCustomer.phone;
        this.myOrder.cusEmail = this.myCustomer.email;
      });
  }

  getTotal() {
    this.totalPayment = this.orderDetails.reduce(
      (pre, curr) => pre + curr.amount,
      0
    );
  }

  createOrder() {
    this.myOrder.totalPayment = this.totalPayment;
    this.myOrder.isDelivery = true;
    this.myOrder.status = 'delivering';
    this.myOrder.accId = Number(localStorage.getItem('accId'));
    this.orderRepo
      .createOrder('api/order', this.myOrder)
      .subscribe((res: any) => {
        console.log(res);
        var createdOrder = res as Order;
        this.orderDetails.forEach((orderDetail) => {
          orderDetail.orderId = createdOrder.orderId;
        });
        console.log(this.orderDetails);
        this.orderDetailRepo
          .createOrderDetails('api/order-detail', this.orderDetails)
          .subscribe(
            (res: any) => {
              console.log(res);
              this.noti.showSuccess(
                'Created Order Successfully!!!',
                'Success Message'
              );
            },
            (error: any) => {
              this.noti.showError(error.error, 'Error Message');
            }
          );
        // this.orderDetails.forEach((orderDetail) => {
        //   this.orderDetailRepo
        //     .createOrderDetail('api/order-detail', orderDetail)
        //     .subscribe((res: any) => {
        //       console.log(res);
        //     });
        // });
      });
  }
}
