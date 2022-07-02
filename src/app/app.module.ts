import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';

import { HeaderComponent } from './components/header/header.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { EmployeeInfoComponent } from './components/employee/employee-info/employee-info.component';
import { TimekeepingComponent } from './components/employee/timekeeping/timekeeping.component';
import { PaySalaryComponent } from './components/employee/pay-salary/pay-salary.component';
import { ProductsComponent } from './components/products/products.component';
import { ProductInfoComponent } from './components/products/product-info/product-info.component';
import { ImportProductComponent } from './components/products/import-product/import-product.component';
import { SupplierComponent } from './components/products/supplier/supplier.component';
import { DeliveryComponent } from './components/delivery/delivery.component';
import { ReportComponent } from './components/report/report.component';
import { OrderReportComponent } from './components/report/order-report/order-report.component';
import { ImportProductReportComponent } from './components/report/import-product-report/import-product-report.component';
import { AdminComponent } from './pages/admin/admin.component';
import { UserComponent } from './pages/user/user.component';
import { ShopSidenavComponent } from './components/shop-sidenav/shop-sidenav.component';
import { ShopComponent } from './components/shop/shop.component';
import { ShopProductDetailComponent } from './components/shop-product-detail/shop-product-detail.component';
import { ShopCartComponent } from './components/shop-cart/shop-cart.component';
import { ShopCheckoutComponent } from './components/shop-checkout/shop-checkout.component';
import { LoginComponent } from './pages/login/login.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { AccountComponent } from './components/account/account.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidenavComponent,
    HomeComponent,
    DashboardComponent,
    EmployeeComponent,
    EmployeeInfoComponent,
    TimekeepingComponent,
    PaySalaryComponent,
    ProductsComponent,
    ProductInfoComponent,
    ImportProductComponent,
    SupplierComponent,
    DeliveryComponent,
    ReportComponent,
    OrderReportComponent,
    ImportProductReportComponent,
    AdminComponent,
    UserComponent,
    ShopSidenavComponent,
    ShopComponent,
    ShopProductDetailComponent,
    ShopCartComponent,
    ShopCheckoutComponent,
    LoginComponent,
    SignUpComponent,
    AccountComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    FormsModule,
    NgbModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatListModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    MatTabsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
