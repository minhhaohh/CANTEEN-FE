import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ProductsComponent } from './products.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ProductInfoComponent } from './product-info/product-info.component';
import { ImportProductComponent } from './import-product/import-product.component';
import { SupplierComponent } from './supplier/supplier.component';

@NgModule({
  declarations: [
    ProductsComponent,
    ProductInfoComponent,
    ImportProductComponent,
    SupplierComponent,
  ],
  imports: [BrowserModule, BrowserAnimationsModule],
  providers: [],
  bootstrap: [ProductsComponent],
})
export class ProductsModule {}
