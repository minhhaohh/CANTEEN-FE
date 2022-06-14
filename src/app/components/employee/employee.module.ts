import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { EmployeeComponent } from './employee.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { EmployeeInfoComponent } from './employee-info/employee-info.component';
import { TimekeepingComponent } from './timekeeping/timekeeping.component';
import { PayWageComponent } from './pay-wage/pay-wage.component';

@NgModule({
  declarations: [
    EmployeeComponent,
    EmployeeInfoComponent,
    TimekeepingComponent,
    PayWageComponent,
  ],
  imports: [BrowserModule, BrowserAnimationsModule],
  providers: [],
  bootstrap: [EmployeeComponent],
})
export class EmployeeModule {}
