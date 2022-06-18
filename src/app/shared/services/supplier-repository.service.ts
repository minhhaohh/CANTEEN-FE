import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Supplier } from './../../models/supplier.model';
import { EnvironmentUrlService } from './environment-url.service';

@Injectable({
  providedIn: 'root',
})
export class SupplierRepositoryService {
  constructor(
    private http: HttpClient,
    private envUrl: EnvironmentUrlService
  ) {}

  public getAllSuppliers = (route: string) => {
    return this.http.get<Supplier[]>(
      this.createCompleteRoute(route, this.envUrl.urlAddress)
    );
  };

  public getSupplier = (route: string) => {
    return this.http.get<Supplier>(
      this.createCompleteRoute(route, this.envUrl.urlAddress)
    );
  };

  public createSupplier = (route: string, supplier: Supplier) => {
    return this.http.post<Supplier>(
      this.createCompleteRoute(route, this.envUrl.urlAddress),
      supplier,
      this.generateHeaders()
    );
  };

  public updateSupplier = (route: string, supplier: Supplier) => {
    return this.http.put(
      this.createCompleteRoute(route, this.envUrl.urlAddress),
      supplier,
      this.generateHeaders()
    );
  };

  public deleteSupplier = (route: string) => {
    return this.http.delete(
      this.createCompleteRoute(route, this.envUrl.urlAddress)
    );
  };

  private createCompleteRoute = (route: string, envAddress: string) => {
    return `${envAddress}/${route}`;
  };

  private generateHeaders = () => {
    return {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
  };
}
