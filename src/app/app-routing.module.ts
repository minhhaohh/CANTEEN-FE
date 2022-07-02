import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserComponent } from './pages/user/user.component';
import { AdminComponent } from './pages/admin/admin.component';
import { LoginComponent } from './pages/login/login.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';

import { HomeComponent } from './components/home/home.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProductsComponent } from './components/products/products.component';
import { DeliveryComponent } from './components/delivery/delivery.component';
import { ReportComponent } from './components/report/report.component';
import { AccountComponent } from './components/account/account.component';

import { ShopComponent } from './components/shop/shop.component';
import { ShopProductDetailComponent } from './components/shop-product-detail/shop-product-detail.component';
import { ShopCartComponent } from './components/shop-cart/shop-cart.component';
import { ShopCheckoutComponent } from './components/shop-checkout/shop-checkout.component';

import { UserGuard } from './shared/guards/user.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'user',
    component: UserComponent,
    children: [
      {
        path: '',
        component: ShopComponent,
      },
      {
        path: 'shop',
        component: ShopComponent,
      },
      {
        path: 'product-detail/:proId',
        component: ShopProductDetailComponent,
      },
      {
        path: 'cart',
        component: ShopCartComponent,
      },
      {
        path: 'checkout',
        component: ShopCheckoutComponent,
      },
    ],
    canActivate: [UserGuard],
  },
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      {
        path: '',
        component: EmployeeComponent,
      },
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'employee',
        component: EmployeeComponent,
      },
      {
        path: 'products',
        component: ProductsComponent,
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'delivery',
        component: DeliveryComponent,
      },
      {
        path: 'report',
        component: ReportComponent,
      },
      {
        path: 'account',
        component: AccountComponent,
      },
    ],
    canActivate: [UserGuard],
  },
  { path: 'login', component: LoginComponent },
  { path: 'sign-up', component: SignUpComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
