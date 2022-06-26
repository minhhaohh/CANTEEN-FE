import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

import { Account } from './../../models/account.model';
import { AccountRepositoryService } from './../../shared/services/account-repository.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
})
export class AccountComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  public dataSourceAccount = new MatTableDataSource<Account>();

  public displayedColumnsAccount = ['accId', 'username', 'password', 'role'];

  myAccount = new Account();

  constructor(private repo: AccountRepositoryService) {}

  ngOnInit(): void {
    this.getAllAccounts();
  }

  ngAfterViewInit(): void {
    this.dataSourceAccount.sort = this.sort;
    this.dataSourceAccount.paginator = this.paginator;
  }

  getAllAccounts() {
    this.repo.getAllAccounts('api/account').subscribe((res: any) => {
      console.log(res);
      this.dataSourceAccount.data = res as Account[];
    });
  }

  selectAccount(selectedAccount) {
    this.repo
      .getAccount(`api/account/${selectedAccount.accId}`)
      .subscribe((res: any) => {
        console.log(res);
        this.myAccount = res as Account;
      });
  }

  createAccount() {
    this.repo
      .createAccount('api/account', this.myAccount)
      .subscribe((res: any) => {
        this.clearForm();
        this.getAllAccounts();
      });
  }

  updateAccount() {
    this.repo
      .updateAccount(`api/account/${this.myAccount.accId}`, this.myAccount)
      .subscribe((res: any) => {
        this.clearForm();
        this.getAllAccounts();
      });
  }

  deleteAccount() {
    this.repo
      .deleteAccount(`api/account/${this.myAccount.accId}`)
      .subscribe((res: any) => {
        console.log(res);
        this.clearForm();
        this.getAllAccounts();
      });
  }

  clearForm() {
    this.myAccount.accId = null;
    this.myAccount.username = null;
    this.myAccount.password = null;
    this.myAccount.role = null;
  }
}
