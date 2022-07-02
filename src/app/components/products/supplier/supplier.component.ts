import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

import { Supplier } from './../../../models/supplier.model';
import { SupplierRepositoryService } from './../../../shared/services/supplier-repository.service';
import { NotificationService } from './../../../shared/services/notification.service';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.css'],
})
export class SupplierComponent implements OnInit, AfterViewInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  public dataSourceSupplier = new MatTableDataSource<Supplier>();

  public displayedColumnsSupplier = [
    'supId',
    'supName',
    'address',
    'phone',
    'email',
  ];

  mySupplier = new Supplier();

  constructor(
    private repo: SupplierRepositoryService,
    private noti: NotificationService
  ) {}

  ngOnInit(): void {
    this.getAllSuppliers();
  }

  ngAfterViewInit(): void {
    this.dataSourceSupplier.sort = this.sort;
    this.dataSourceSupplier.paginator = this.paginator;
  }

  getAllSuppliers() {
    this.repo.getAllSuppliers('api/supplier').subscribe((res: any) => {
      this.dataSourceSupplier.data = res as Supplier[];
    });
  }

  selectSupplier(selectedSupplier) {
    console.log('selectSupplier', selectedSupplier);
    this.repo
      .getSupplier(`api/supplier/${selectedSupplier.supId}`)
      .subscribe((res: any) => {
        this.mySupplier = res as Supplier;
      });
  }

  createSupplier() {
    this.repo.createSupplier('api/supplier', this.mySupplier).subscribe(
      (res: any) => {
        this.noti.showSuccess(
          'Created Supplier Successfully!!!',
          'Success Message'
        );
        this.clearForm();
        this.getAllSuppliers();
      },
      (error: any) => {
        this.noti.showError(error.error, 'Error Message');
      }
    );
  }

  updateSupplier() {
    this.repo
      .updateSupplier(`api/supplier/${this.mySupplier.supId}`, this.mySupplier)
      .subscribe(
        (res: any) => {
          this.noti.showSuccess(
            'Updated Supplier Successfully!!!',
            'Success Message'
          );
          this.clearForm();
          this.getAllSuppliers();
        },
        (error: any) => {
          this.noti.showError(error.error, 'Error Message');
        }
      );
  }

  deleteSupplier() {
    this.repo.deleteSupplier(`api/supplier/${this.mySupplier.supId}`).subscribe(
      (res: any) => {
        this.noti.showSuccess(
          'Deleted Supplier Successfully!!!',
          'Success Message'
        );
        console.log(res);
        this.clearForm();
        this.getAllSuppliers();
      },
      (error: any) => {
        this.noti.showError(error.error, 'Error Message');
      }
    );
  }

  clearForm() {
    this.mySupplier.supId = null;
    this.mySupplier.supName = null;
    this.mySupplier.address = null;
    this.mySupplier.phone = null;
    this.mySupplier.email = null;
  }
}
