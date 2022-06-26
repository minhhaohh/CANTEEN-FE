import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Account } from './../../models/account.model';
import { EnvironmentUrlService } from './environment-url.service';

@Injectable({
  providedIn: 'root',
})
export class AccountRepositoryService {
  constructor(
    private http: HttpClient,
    private envUrl: EnvironmentUrlService
  ) {}

  public getAllAccounts = (route: string) => {
    return this.http.get<Account[]>(
      this.createCompleteRoute(route, this.envUrl.urlAddress)
    );
  };

  public checkAuthentication = (route: string) => {
    return this.http.get<Boolean>(
      this.createCompleteRoute(route, this.envUrl.urlAddress)
    );
  };

  public getAccount = (route: string) => {
    return this.http.get<Account>(
      this.createCompleteRoute(route, this.envUrl.urlAddress)
    );
  };

  public createAccount = (route: string, employee: Account) => {
    return this.http.post<Account>(
      this.createCompleteRoute(route, this.envUrl.urlAddress),
      employee,
      this.generateHeaders()
    );
  };

  public updateAccount = (route: string, account: Account) => {
    return this.http.put(
      this.createCompleteRoute(route, this.envUrl.urlAddress),
      account,
      this.generateHeaders()
    );
  };

  public deleteAccount = (route: string) => {
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
