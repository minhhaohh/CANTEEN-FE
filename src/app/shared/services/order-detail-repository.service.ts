import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { OrderDetail } from './../../models/order-detail.model';
import { EnvironmentUrlService } from './environment-url.service';

@Injectable({
  providedIn: 'root',
})
export class OrderDetailRepositoryService {
  constructor(
    private http: HttpClient,
    private envUrl: EnvironmentUrlService
  ) {}

  public getOrderDetails = (route: string) => {
    return this.http.get<OrderDetail[]>(
      this.createCompleteRoute(route, this.envUrl.urlAddress)
    );
  };

  public createOrderDetails = (route: string, orderDetails: OrderDetail[]) => {
    return this.http.post<OrderDetail>(
      this.createCompleteRoute(route, this.envUrl.urlAddress),
      orderDetails,
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
