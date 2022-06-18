import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from './../../models/product.model';
import { EnvironmentUrlService } from './environment-url.service';

@Injectable({
  providedIn: 'root',
})
export class ProductRepositoryService {
  constructor(
    private http: HttpClient,
    private envUrl: EnvironmentUrlService
  ) {}

  public getAllProducts = (route: string) => {
    return this.http.get<Product[]>(
      this.createCompleteRoute(route, this.envUrl.urlAddress)
    );
  };

  public getProduct = (route: string) => {
    return this.http.get<Product>(
      this.createCompleteRoute(route, this.envUrl.urlAddress)
    );
  };

  public createProduct = (route: string, product: Product) => {
    return this.http.post<Product>(
      this.createCompleteRoute(route, this.envUrl.urlAddress),
      product,
      this.generateHeaders()
    );
  };

  public updateProduct = (route: string, product: Product) => {
    return this.http.put(
      this.createCompleteRoute(route, this.envUrl.urlAddress),
      product,
      this.generateHeaders()
    );
  };

  public deleteProduct = (route: string) => {
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
