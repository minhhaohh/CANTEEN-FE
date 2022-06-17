import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Timekeeping } from './../../models/timekeeping.model';
import { EnvironmentUrlService } from './environment-url.service';

@Injectable({
  providedIn: 'root',
})
export class TimekeepingRepositoryService {
  constructor(
    private http: HttpClient,
    private envUrl: EnvironmentUrlService
  ) {}

  public getAllTimekeepings = (route: string) => {
    return this.http.get<Timekeeping[]>(
      this.createCompleteRoute(route, this.envUrl.urlAddress)
    );
  };

  public createTimekeeping = (route: string, timekeeping: Timekeeping) => {
    return this.http.post<Timekeeping>(
      this.createCompleteRoute(route, this.envUrl.urlAddress),
      timekeeping,
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
