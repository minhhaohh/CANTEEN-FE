import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

import { Employee } from './../../../models/employee.model';
import { EmployeeRepositoryService } from './../../../shared/services/employee-repository.service';

@Component({
  selector: 'app-employee-info',
  templateUrl: './employee-info.component.html',
  styleUrls: ['./employee-info.component.css'],
})
export class EmployeeInfoComponent implements OnInit, AfterViewInit {
  model = new Date();
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  public dataSource = new MatTableDataSource<Employee>();

  public displayedColumns = [
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

  newEmployee: Employee = {
    empId: null,
    empName: 'Tran Minh Hao',
    sex: 'male',
    birthdate: new Date(),
    address: 'Binh Dinh',
    phone: '0123456789',
    email: 'minhhao.hh@gmail.com',
    position: 'manager',
    salary: 150000,
    image: null,
  };

  constructor(private repo: EmployeeRepositoryService) {}

  ngOnInit(): void {
    this.getAllEmployees();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  getAllEmployees() {
    this.repo.getAllEmployees('api/employee').subscribe((res: any) => {
      console.log(res);
      this.dataSource.data = res as Employee[];
    });
  }

  selectEmployee(selectedEmployee) {
    this.repo
      .getAllEmployees(`api/employee/${selectedEmployee.empId}`)
      .subscribe((res: any) => {
        console.log(res);
        this.fillForm(selectedEmployee);
      });
  }

  createEmployee() {
    this.repo
      .createEmployee('api/employee', this.newEmployee)
      .subscribe((res: any) => {
        console.log(res);
      });
  }

  fillForm(selectedEmployee) {
    this.myEmployee.empId = selectedEmployee.empId;
    this.myEmployee.empName = selectedEmployee.empName;
    this.myEmployee.sex = selectedEmployee.sex;
    this.myEmployee.birthdate = selectedEmployee.birthdate;
    this.myEmployee.address = selectedEmployee.address;
    this.myEmployee.phone = selectedEmployee.phone;
    this.myEmployee.email = selectedEmployee.email;
    this.myEmployee.position = selectedEmployee.position;
    this.myEmployee.salary = selectedEmployee.salary;
    this.myEmployee.image = selectedEmployee.image;
  }
}
