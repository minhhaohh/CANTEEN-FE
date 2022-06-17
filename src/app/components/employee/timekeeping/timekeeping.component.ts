import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

import { FormatDate } from './../../../shared/common/format-date';

import { Employee } from './../../../models/employee.model';
import { Timekeeping } from './../../../models/timekeeping.model';

import { EmployeeRepositoryService } from './../../../shared/services/employee-repository.service';
import { TimekeepingRepositoryService } from './../../../shared/services/timekeeping-repository.service';

@Component({
  selector: 'app-timekeeping',
  templateUrl: './timekeeping.component.html',
  styleUrls: ['./timekeeping.component.css'],
})
export class TimekeepingComponent implements OnInit, AfterViewInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  formatDate = new FormatDate();

  public dataSourceEmployee = new MatTableDataSource<Employee>();
  public dataSourceTimekeeping = new MatTableDataSource<Timekeeping>();

  public displayedColumnsEmployee = [
    'empId',
    'empName',
    'sex',
    'birthdate',
    'address',
    'phone',
    'position',
  ];
  public displayedColumnsTimekeeping = [
    'empId',
    'empName',
    'confirmDate',
    'shift',
  ];

  myEmployee = new Employee();
  myTimekeeping = new Timekeeping();

  datepicker: NgbDateStruct = this.formatDate.dateToNgbDateStruct(
    this.myTimekeeping.confirmDate
  );

  constructor(
    private employeeRepo: EmployeeRepositoryService,
    private timekeepingRepo: TimekeepingRepositoryService
  ) {}

  ngOnInit(): void {
    this.getAllEmployees();
    this.getAllTimekeepings();
    console.log(this.myTimekeeping);
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

  getAllTimekeepings() {
    this.timekeepingRepo
      .getAllTimekeepings('api/time-keeping')
      .subscribe((res: any) => {
        this.dataSourceTimekeeping.data = res as Timekeeping[];
      });
  }

  createTimekeeping() {
    this.myTimekeeping.empId = this.myEmployee.empId;
    this.myTimekeeping.confirmDate = this.formatDate.ngbDateStructToDate(
      this.datepicker
    );
    this.timekeepingRepo
      .createTimekeeping('api/time-keeping', this.myTimekeeping)
      .subscribe((res: any) => {
        this.getAllTimekeepings();
      });
  }
}
