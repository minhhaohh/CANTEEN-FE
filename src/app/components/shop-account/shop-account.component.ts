import { Component, OnInit } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

import { FormatDate } from './../../shared/common/format-date';

import { Customer } from './../../models/customer.model';
import { CustomerRepositoryService } from './../../shared/services/customer-repository.service';
import { NotificationService } from './../../shared/services/notification.service';

@Component({
  selector: 'app-shop-account',
  templateUrl: './shop-account.component.html',
  styleUrls: ['./shop-account.component.css'],
})
export class ShopAccountComponent implements OnInit {
  myUsername: string = localStorage.getItem('username');
  myCustomer = new Customer();
  formatDate = new FormatDate();

  datepicker: NgbDateStruct = this.formatDate.dateToNgbDateStruct(
    this.myCustomer.birthdate
  );

  constructor(
    private customerRepo: CustomerRepositoryService,
    private noti: NotificationService
  ) {}

  ngOnInit(): void {
    this.getCustomerByUsername();
  }

  getCustomerByUsername() {
    this.customerRepo
      .getCustomer(`api/customer/GetCustomerByUserName/${this.myUsername}`)
      .subscribe((res: any) => {
        console.log(res);
        this.myCustomer = res as Customer;
        var date: Date = new Date(this.myCustomer.birthdate);
        this.datepicker = this.formatDate.dateToNgbDateStruct(date);
      });
  }

  updateCustomer() {
    this.myCustomer.birthdate = this.formatDate.ngbDateStructToDate(
      this.datepicker
    );
    this.customerRepo
      .updateCustomer(`api/customer/${this.myCustomer.cusId}`, this.myCustomer)
      .subscribe(
        (res: any) => {
          this.noti.showSuccess(
            'Updated Employee Successfully!!!',
            'Success Message'
          );
        },
        (error: any) => {
          this.noti.showError(error.error, 'Error Message');
        }
      );
  }
}
