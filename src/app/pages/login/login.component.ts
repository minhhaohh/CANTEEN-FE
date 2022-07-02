import { Component, OnInit } from '@angular/core';

import { Account } from './../../models/account.model';
import { AccountRepositoryService } from './../../shared/services/account-repository.service';

import { AuthService } from './../../shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  myAccount = new Account();
  userName: string = '';
  password: string = '';

  constructor(
    private repo: AccountRepositoryService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  login() {
    this.repo
      .checkAuthentication(
        `api/account/${this.myAccount.username}/${this.myAccount.password}`
      )
      .subscribe((res: any) => {
        var returnedAccount = res as Account;
        console.log(returnedAccount);
        this.authService.login(
          returnedAccount.accId,
          returnedAccount.username,
          returnedAccount.role
        );
      });
    // this.userName = this.myAccount.username;
    // this.password = this.myAccount.password;
    // console.log(this.userName, this.password);
    // this.authService.login(this.userName, this.password);
  }
  //checkAuthentication() {
  // this.repo
  //   .checkAuthentication(
  //     `api/account/${this.myAccount.username}/${this.myAccount.password}`
  //   )
  //   .subscribe((res: any) => {
  //     console.log(res);
  //   });
  // this.userName = this.myAccount.username;
  // this.password = this.myAccount.password;

  // console.log('Login page: ' + this.userName);
  // console.log('Login page: ' + this.password);

  // this.authService.login(this.userName, this.password).subscribe((data) => {
  //   console.log('Is Login Success: ' + data);

  //   if (data) this.router.navigate(['/user']);
  // });
  //}
}
