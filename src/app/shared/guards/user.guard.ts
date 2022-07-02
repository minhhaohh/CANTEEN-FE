import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from './../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserGuard implements CanActivate {
  constructor(private router: Router, private auth_service: AuthService) {}

  // Implement canActivate() method
  canActivate(route: ActivatedRouteSnapshot) {
    const expectedRole = route.data.roles;
    // return true if user role is not expectedRole
    var notRole =
      expectedRole != undefined && this.auth_service.role != expectedRole;

    // Redirect to login page if the user is not authenticated
    if (!this.auth_service.isAuthenticated()) {
      this.router.navigate(['login']);
      return false;
    }
    // Alarm when user is not granted to access the resource
    else if (notRole) {
      alert('This function require Administration');
      return false;
    }
    return true;
  }

  // constructor(private authService: AuthService, private router: Router) {}

  // canActivate(
  //   next: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot
  // ): boolean | UrlTree {
  //   let url: string = state.url;

  //   return this.checkLogin(url);
  // }

  // checkLogin(url: string): true | UrlTree {
  //   console.log('Url: ' + url);
  //   let val: string = localStorage.getItem('isUserLoggedIn');
  //   let role: string = localStorage.getItem('role');

  //   if (val != null && val == 'true' && role == 'user') {
  //     if (url == '/login') this.router.parseUrl('/user');
  //     else return true;
  //   } else if (val != null && val == 'true' && role == 'admin') {
  //     if (url == '/login') this.router.parseUrl('/admin');
  //     else return true;
  //   } else {
  //     return this.router.parseUrl('/login');
  //   }
  // }
}
