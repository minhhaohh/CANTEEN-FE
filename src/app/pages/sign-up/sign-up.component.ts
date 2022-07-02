import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

import { FormatDate } from './../../shared/common/format-date';

import { Account } from './../../models/account.model';
import { Customer } from './../../models/customer.model';
import { AccountRepositoryService } from './../../shared/services/account-repository.service';
import { CustomerRepositoryService } from './../../shared/services/customer-repository.service';
import { NotificationService } from './../../shared/services/notification.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  myAccount = new Account();
  myCustomer = new Customer();

  formatDate = new FormatDate();

  datepicker: NgbDateStruct = this.formatDate.dateToNgbDateStruct(
    this.myCustomer.birthdate
  );

  constructor(
    private accountRepo: AccountRepositoryService,
    private customerRepo: CustomerRepositoryService,
    private router: Router,
    private noti: NotificationService
  ) {}

  ngOnInit(): void {}

  signUp() {
    this.myCustomer.birthdate = this.formatDate.ngbDateStructToDate(
      this.datepicker
    );
    this.accountRepo.createAccount('api/account', this.myAccount).subscribe(
      (res: any) => {
        console.log(res);
        var createdAccount = res as Account;
        this.myCustomer.accId = createdAccount.accId;
        console.log(createdAccount);
        console.log(this.myCustomer);
        this.customerRepo
          .createCustomer('api/customer', this.myCustomer)
          .subscribe((res: any) => {
            console.log(res);
            this.noti.showSuccess(
              'Created Account Successfully!!!',
              'Success Message'
            );
            this.router.navigate(['login']);
          });
      },
      (error: any) => {
        this.noti.showError(error.error, 'Error Message');
      }
    );
  }
}
