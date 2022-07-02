import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

import { FormatDate } from './../../../shared/common/format-date';

import { Employee } from './../../../models/employee.model';
import { Timekeeping } from './../../../models/timekeeping.model';
import { PaySalary } from './../../../models/pay-salary.model';

import { EmployeeRepositoryService } from './../../../shared/services/employee-repository.service';
import { TimekeepingRepositoryService } from './../../../shared/services/timekeeping-repository.service';
import { PaySalaryRepositoryService } from './../../../shared/services/pay-salary-repository.service';
import { NotificationService } from './../../../shared/services/notification.service';

@Component({
  selector: 'app-pay-salary',
  templateUrl: './pay-salary.component.html',
  styleUrls: ['./pay-salary.component.css'],
})
export class PaySalaryComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  formatDate = new FormatDate();

  public dataSourceEmployee = new MatTableDataSource<Employee>();
  public dataSourcePaySalary = new MatTableDataSource<PaySalary>();

  public displayedColumnsEmployee = [
    'empId',
    'empName',
    'sex',
    'birthdate',
    'address',
    'position',
    'salary',
  ];
  public displayedColumnsPaySalary = [
    'empId',
    'empName',
    'fromDate',
    'toDate',
    'shiftNumber',
    'bonusSalary',
    'totalSalary',
  ];

  myEmployee = new Employee();
  myTimekeeping = new Timekeeping();
  myPaySalary = new PaySalary();

  datepickerFrom: NgbDateStruct = this.formatDate.dateToNgbDateStruct(
    this.myPaySalary.fromDate
  );

  datepickerTo: NgbDateStruct = this.formatDate.dateToNgbDateStruct(
    this.myPaySalary.toDate
  );

  constructor(
    private employeeRepo: EmployeeRepositoryService,
    private paySalaryRepo: PaySalaryRepositoryService,
    private timekeepingRepo: TimekeepingRepositoryService,
    private noti: NotificationService
  ) {}

  ngOnInit(): void {
    this.getAllEmployees();
    this.getAllPaySalarys();
  }

  ngAfterViewInit(): void {
    this.dataSourceEmployee.sort = this.sort;
    this.dataSourceEmployee.paginator = this.paginator;
    this.dataSourcePaySalary.sort = this.sort;
    this.dataSourcePaySalary.paginator = this.paginator;
  }

  getAllEmployees() {
    this.employeeRepo.getAllEmployees('api/employee').subscribe((res: any) => {
      this.dataSourceEmployee.data = res as Employee[];
    });
  }

  selectEmployee(selectedEmployee) {
    this.employeeRepo
      .getEmployee(`api/employee/${selectedEmployee.empId}`)
      .subscribe((res: any) => {
        this.myEmployee = res as Employee;
        this.getTotalSalary();
      });
  }

  getAllPaySalarys() {
    this.paySalaryRepo
      .getAllPaySalarys('api/pay-salary')
      .subscribe((res: any) => {
        this.dataSourcePaySalary.data = res as PaySalary[];
      });
  }

  createPaySalary() {
    this.myPaySalary.empId = this.myEmployee.empId;
    this.myPaySalary.fromDate = this.formatDate.ngbDateStructToDate(
      this.datepickerFrom
    );
    this.myPaySalary.toDate = this.formatDate.ngbDateStructToDate(
      this.datepickerTo
    );
    this.paySalaryRepo
      .createPaySalary('api/pay-salary', this.myPaySalary)
      .subscribe(
        (res: any) => {
          this.noti.showSuccess(
            'Comfirmed PaySalary Successfully!!!',
            'Success Message'
          );
          this.getAllPaySalarys();
        },
        (error: any) => {
          this.noti.showError(error.error, 'Error Message');
        }
      );
  }

  getShiftNumber() {
    var fromDate = this.formatDate.ngbDateStructToDateString(
      this.datepickerFrom
    );
    var toDate = this.formatDate.ngbDateStructToDateString(this.datepickerTo);
    // var fromDate = `${this.datepickerFrom.year}-${this.datepickerFrom.month}-${this.datepickerFrom.day}`;
    // var toDate = `${this.datepickerTo.year}-${this.datepickerTo.month}-${this.datepickerTo.day}`;
    this.timekeepingRepo
      .getTimekeepingNumberFromDateToDate(
        `api/time-keeping/${this.myEmployee.empId}/${fromDate}/${toDate}`
      )
      .subscribe((res: any) => {
        console.log(fromDate, toDate);
        this.myPaySalary.shiftNumber = res as number;
        this.getTotalSalary();
      });
  }

  getTotalSalary() {
    this.myPaySalary.totalSalary =
      this.myEmployee.salary * this.myPaySalary.shiftNumber +
      this.myPaySalary.bonusSalary;
  }

  addBonusSalary() {
    this.myPaySalary.bonusSalary = this.myPaySalary.bonusSalary * 1;
    this.getTotalSalary();
  }
}
