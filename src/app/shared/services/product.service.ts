import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import ProductType from 'src/app/types/product.type';

@Injectable()
export class ProductService {
  constructor(private http: HttpClient) {}

  public getAll(): Observable<ProductType[]> {
    return this.http.get<ProductType[]>('https://testologia.ru/tea');
  }

  public getSearch(search: string): Observable<ProductType[]> {
    return this.http.get<ProductType[]>(
      `https://testologia.ru/tea?search=${search}`
    );
  }

  public getOne(id: number): Observable<ProductType> {
    return this.http.get<ProductType>(`https://testologia.ru/tea?id=${id}`);
  }

  public getIds(): Array<string> {
    let ids: Array<string> = [];
    this.getAll().subscribe({
      next: (data) => {
        data.forEach((item) => {
          ids.push(item.id.toString());
        });
      },
    });
    return ids;
  }
}
