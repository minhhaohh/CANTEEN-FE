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
    private paySalaryRepo: PaySalaryRepositoryService
  ) {}

  ngOnInit(): void {
    this.getAllEmployees();
    this.getAllPaySalarys();
  }

  ngAfterViewInit(): void {
    this.dataSourceEmployee.sort = this.sort;
    this.dataSourceEmployee.paginator = this.paginator;
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
      });
  }

  getAllPaySalarys() {
    this.paySalaryRepo
      .getAllPaySalarys('api/pay-salary')
      .subscribe((res: any) => {
        this.dataSourcePaySalary.data = res as PaySalary[];
      });
  }

  createTimekeeping() {
    this.myPaySalary.empId = this.myEmployee.empId;
    this.myPaySalary.fromDate = this.formatDate.ngbDateStructToDate(
      this.datepickerFrom
    );
    this.myPaySalary.toDate = this.formatDate.ngbDateStructToDate(
      this.datepickerTo
    );
    this.paySalaryRepo
      .createPaySalary('api/pay-salary', this.myPaySalary)
      .subscribe((res: any) => {
        console.log(res);
        this.getAllPaySalarys();
      });
  }
}
