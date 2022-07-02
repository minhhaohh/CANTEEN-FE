import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Customer } from './../../models/customer.model';
import { EnvironmentUrlService } from './environment-url.service';

@Injectable({
  providedIn: 'root',
})
export class CustomerRepositoryService {
  constructor(
    private http: HttpClient,
    private envUrl: EnvironmentUrlService
  ) {}

  public getAllCustomers = (route: string) => {
    return this.http.get<Customer[]>(
      this.createCompleteRoute(route, this.envUrl.urlAddress)
    );
  };

  public getCustomer = (route: string) => {
    return this.http.get<Customer>(
      this.createCompleteRoute(route, this.envUrl.urlAddress)
    );
  };

  public createCustomer = (route: string, customer: Customer) => {
    return this.http.post<Customer>(
      this.createCompleteRoute(route, this.envUrl.urlAddress),
      customer,
      this.generateHeaders()
    );
  };

  public updateCustomer = (route: string, customer: Customer) => {
    return this.http.put(
      this.createCompleteRoute(route, this.envUrl.urlAddress),
      customer,
      this.generateHeaders()
    );
  };

  public deleteCustomer = (route: string) => {
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
