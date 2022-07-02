import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ImportProduct } from './../../models/import-product.model';
import { EnvironmentUrlService } from './environment-url.service';

@Injectable({
  providedIn: 'root',
})
export class ImportProductRepositoryService {
  constructor(
    private http: HttpClient,
    private envUrl: EnvironmentUrlService
  ) {}

  public getAllImportProducts = (route: string) => {
    return this.http.get<ImportProduct[]>(
      this.createCompleteRoute(route, this.envUrl.urlAddress)
    );
  };

  public getImportProductsBy = (route: string) => {
    return this.http.get<ImportProduct[]>(
      this.createCompleteRoute(route, this.envUrl.urlAddress)
    );
  };

  public exportExcel = (route: string) => {
    return this.http.get(
      this.createCompleteRoute(route, this.envUrl.urlAddress),
      {
        observe: 'response',
        responseType: 'blob',
      }
    );
  };

  public createImportProduct = (
    route: string,
    importProduct: ImportProduct
  ) => {
    return this.http.post<ImportProduct>(
      this.createCompleteRoute(route, this.envUrl.urlAddress),
      importProduct,
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
