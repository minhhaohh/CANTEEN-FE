import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

import { EmployeeRepositoryService } from './../../shared/services/employee-repository.service';
import { Employee } from './../../models/employee.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, AfterViewInit {
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

  getEmployee(selectedEmployee) {
    this.repo
      .getAllEmployees(`api/employee/${selectedEmployee.empId}`)
      .subscribe((res: any) => {
        console.log(res);
      });
  }
}
