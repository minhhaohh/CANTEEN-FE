import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Observable, of } from 'rxjs';
import { tap, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isUserLoggedIn = false;
  role: string = '';

  constructor(private router: Router) {}

  login(accId: number, username: string, role: string) {
    this.isUserLoggedIn = true;
    this.role = role;
    localStorage.setItem('accId', accId.toLocaleString());
    localStorage.setItem(
      'isUserLoggedIn',
      this.isUserLoggedIn ? 'true' : 'false'
    );
    localStorage.setItem('username', username);
    // User role
    if (role == 'user') {
      this.router.navigate(['/user']);
    }
    // Admin role
    else if (role == 'admin') {
      this.router.navigate(['/admin']);
    } else {
      this.isUserLoggedIn = false;
    }
  }

  // Redirect to login page
  logout() {
    this.isUserLoggedIn = false;
    localStorage.removeItem('accId');
    localStorage.removeItem('isUserLoggedIn');
    localStorage.removeItem('username');
    this.router.navigate(['/login']);
  }

  isAuthenticated() {
    // return true if the user enter correct user name and password
    return this.isUserLoggedIn;
  }
  // isUserLoggedIn: boolean = false;

  // login(userName: string, password: string) {
  //   console.log(userName);
  //   console.log(password);
  //   this.isUserLoggedIn = userName == 'admin' && password == 'admin';
  //   localStorage.setItem(
  //     'isUserLoggedIn',
  //     this.isUserLoggedIn ? 'true' : 'false'
  //   );

  //   return of(this.isUserLoggedIn).pipe(
  //     delay(1000),
  //     tap((val) => {
  //       console.log('Is User Authentication is successful: ' + val);
  //     })
  //   );
  // }

  // logout(): void {
  //   this.isUserLoggedIn = false;
  //   localStorage.removeItem('isUserLoggedIn');
  // }

  // constructor() {}
}
