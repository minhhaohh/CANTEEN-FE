import { Component, OnInit } from '@angular/core';

import { Product } from './../../models/product.model';
import { OrderDetail } from './../../models/order-detail.model';
import { ProductRepositoryService } from './../../shared/services/product-repository.service';
import { CartService } from './../../shared/services/cart.service';
import { NotificationService } from './../../shared/services/notification.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css'],
})
export class ShopComponent implements OnInit {
  products: Product[];
  type: string = '';

  constructor(
    private productRepo: ProductRepositoryService,
    private cart: CartService,
    private noti: NotificationService
  ) {}

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts() {
    this.productRepo.getAllProducts(`api/product`).subscribe((res: any) => {
      this.products = res as Product[];
    });
  }

  getProductsByType() {
    this.productRepo
      .getProductsByType(`api/product/GetProductsByType/${this.type}`)
      .subscribe((res: any) => {
        this.products = res as Product[];
      });
  }

  selectType(type: string) {
    this.type = type;
    if (this.type === '') {
      this.getAllProducts();
    } else {
      this.getProductsByType();
    }
  }

  addToCart(product: Product) {
    var orderDetails = this.cart.getorderDetails();
    if (
      orderDetails.some((orderDetail) => orderDetail.proId === product.proId)
    ) {
      orderDetails.find((orderDetail) => orderDetail.proId === product.proId)
        .qty++;
      orderDetails.find(
        (orderDetail) => orderDetail.proId === product.proId
      ).amount += product.price;
    } else {
      var orderDetail = new OrderDetail();
      orderDetail.orderId = null;
      orderDetail.proId = product.proId;
      orderDetail.proName = product.proName;
      orderDetail.image = product.image;
      orderDetail.price = product.price;
      orderDetail.qty = 1;
      orderDetail.amount = product.price;
      this.cart.addOrderDetail(orderDetail);
    }

    this.noti.showSuccess('Added to Cart Successfully!!!', 'Success Message');
  }
}
