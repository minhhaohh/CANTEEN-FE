import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

import { FormatDate } from './../../../shared/common/format-date';

import { Employee } from './../../../models/employee.model';
import { EmployeeRepositoryService } from './../../../shared/services/employee-repository.service';
import { NotificationService } from './../../../shared/services/notification.service';

@Component({
  selector: 'app-employee-info',
  templateUrl: './employee-info.component.html',
  styleUrls: ['./employee-info.component.css'],
})
export class EmployeeInfoComponent implements OnInit, AfterViewInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  formatDate = new FormatDate();

  public dataSourceEmployee = new MatTableDataSource<Employee>();

  public displayedColumnsEmployee = [
    'empId',
    'empName',
    'sex',
    'birthdate',
    'address',
    'phone',
    'email',
    'position',
    'salary',
    'image',
  ];

  myEmployee = new Employee();

  datepicker: NgbDateStruct = this.formatDate.dateToNgbDateStruct(
    this.myEmployee.birthdate
  );

  constructor(
    private repo: EmployeeRepositoryService,
    private noti: NotificationService
  ) {}

  ngOnInit(): void {
    this.getAllEmployees();
  }

  ngAfterViewInit(): void {
    this.dataSourceEmployee.sort = this.sort;
    this.dataSourceEmployee.paginator = this.paginator;
  }

  getAllEmployees() {
    this.repo.getAllEmployees('api/employee').subscribe((res: any) => {
      this.dataSourceEmployee.data = res as Employee[];
    });
  }

  selectEmployee(selectedEmployee) {
    this.repo
      .getEmployee(`api/employee/${selectedEmployee.empId}`)
      .subscribe((res: any) => {
        this.myEmployee = res as Employee;
        var date: Date = new Date(this.myEmployee.birthdate);
        this.datepicker = this.formatDate.dateToNgbDateStruct(date);
      });
  }

  createEmployee() {
    this.myEmployee.birthdate = this.formatDate.ngbDateStructToDate(
      this.datepicker
    );
    this.repo.createEmployee('api/employee', this.myEmployee).subscribe(
      (res: any) => {
        this.noti.showSuccess(
          'Created Employee Successfully!!!',
          'Success Message'
        );
        this.clearForm();
        this.getAllEmployees();
      },
      (error: any) => {
        this.noti.showError(error.error, 'Error Message');
      }
    );
  }

  updateEmployee() {
    this.myEmployee.birthdate = this.formatDate.ngbDateStructToDate(
      this.datepicker
    );
    this.repo
      .updateEmployee(`api/employee/${this.myEmployee.empId}`, this.myEmployee)
      .subscribe(
        (res: any) => {
          this.noti.showSuccess(
            'Updated Employee Successfully!!!',
            'Success Message'
          );
          this.clearForm();
          this.getAllEmployees();
        },
        (error: any) => {
          this.noti.showError(error.error, 'Error Message');
        }
      );
  }

  deleteEmployee() {
    this.repo.deleteEmployee(`api/employee/${this.myEmployee.empId}`).subscribe(
      (res: any) => {
        this.noti.showSuccess(
          'Deleted Employee Successfully!!!',
          'Success Message'
        );
        this.clearForm();
        this.getAllEmployees();
      },
      (error: any) => {
        this.noti.showError(error.error, 'Error Message');
      }
    );
  }

  clearForm() {
    this.myEmployee.empId = null;
    this.myEmployee.empName = null;
    this.myEmployee.sex = 'male';
    this.myEmployee.birthdate = new Date();
    this.myEmployee.address = null;
    this.myEmployee.phone = null;
    this.myEmployee.email = null;
    this.myEmployee.position = 'manager';
    this.myEmployee.salary = null;
    this.myEmployee.image = null;
    this.datepicker = this.formatDate.dateToNgbDateStruct(
      this.myEmployee.birthdate
    );
  }

  chooseFileImage(event) {
    var path = './../../../assets/images/employees/';
    var fileName = event.target.files[0].name;
    path += fileName;
    console.log(path);
    this.myEmployee.image = path;
    console.log(path);
  }
}
