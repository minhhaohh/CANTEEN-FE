import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Employee } from './../../models/employee.model';
import { EnvironmentUrlService } from './environment-url.service';

@Injectable({
  providedIn: 'root',
})
export class EmployeeRepositoryService {
  constructor(
    private http: HttpClient,
    private envUrl: EnvironmentUrlService
  ) {}

  public getAllEmployees = (route: string) => {
    return this.http.get<Employee[]>(
      this.createCompleteRoute(route, this.envUrl.urlAddress)
    );
  };

  public getEmployee = (route: string) => {
    return this.http.get<Employee>(
      this.createCompleteRoute(route, this.envUrl.urlAddress)
    );
  };

  public createEmployee = (route: string, employee: Employee) => {
    return this.http.post<Employee>(
      this.createCompleteRoute(route, this.envUrl.urlAddress),
      employee,
      this.generateHeaders()
    );
  };

  public updateEmployee = (route: string, employee: Employee) => {
    return this.http.put(
      this.createCompleteRoute(route, this.envUrl.urlAddress),
      employee,
      this.generateHeaders()
    );
  };

  public deleteEmployee = (route: string) => {
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
