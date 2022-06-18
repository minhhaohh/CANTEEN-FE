import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PaySalary } from './../../models/pay-salary.model';
import { EnvironmentUrlService } from './environment-url.service';

@Injectable({
  providedIn: 'root',
})
export class PaySalaryRepositoryService {
  constructor(
    private http: HttpClient,
    private envUrl: EnvironmentUrlService
  ) {}

  public getAllPaySalarys = (route: string) => {
    return this.http.get<PaySalary[]>(
      this.createCompleteRoute(route, this.envUrl.urlAddress)
    );
  };

  public createPaySalary = (route: string, paySalary: PaySalary) => {
    return this.http.post<PaySalary>(
      this.createCompleteRoute(route, this.envUrl.urlAddress),
      paySalary,
      this.generateHeaders()
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
