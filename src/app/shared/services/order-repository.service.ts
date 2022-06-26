import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Order } from './../../models/order.model';
import { EnvironmentUrlService } from './environment-url.service';

@Injectable({
  providedIn: 'root',
})
export class OrderRepositoryService {
  constructor(
    private http: HttpClient,
    private envUrl: EnvironmentUrlService
  ) {}

  public getAllOrders = (route: string) => {
    return this.http.get<Order[]>(
      this.createCompleteRoute(route, this.envUrl.urlAddress)
    );
  };

  public getOrdersBy = (route: string) => {
    return this.http.get<Order[]>(
      this.createCompleteRoute(route, this.envUrl.urlAddress)
    );
  };

  public getOrder = (route: string) => {
    return this.http.get<Order>(
      this.createCompleteRoute(route, this.envUrl.urlAddress)
    );
  };

  public createOrder = (route: string, order: Order) => {
    return this.http.post<Order>(
      this.createCompleteRoute(route, this.envUrl.urlAddress),
      order,
      this.generateHeaders()
    );
  };

  public updateOrder = (route: string, order: Order) => {
    return this.http.put(
      this.createCompleteRoute(route, this.envUrl.urlAddress),
      order,
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
