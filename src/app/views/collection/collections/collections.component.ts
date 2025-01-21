import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductService } from 'src/app/shared/services/product.service';
import { SearchService } from 'src/app/shared/services/search.service';
import ProductType from 'src/app/types/product.type';

@Component({
  selector: 'app-collections',
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.scss'],
})
export class CollectionsComponent implements OnInit {
  public isLoadedData: boolean = false;
  public titlePage: string = 'Наши чайные коллекции';
  public isNotProducts: boolean = false;

  public products: ProductType[] = [];
  private subscribeProducts: Subscription | null = null;
  private subscribeSearch: Subscription | null = null;

  constructor(
    private productService: ProductService,
    private searchService: SearchService
  ) {}

  ngOnInit(): void {
    this.subscribeProducts = this.productService.getAll().subscribe({
      next: (data) => {
        this.products = data;
        this.isLoadedData = true;
        this.titlePage = 'Наши чайные коллекции';
      },
    });

    this.subscribeSearch = this.searchService.searchSubject.subscribe({
      next: (search) => {
        console.log(search);
        if (search.length > 0) {
          this.subscribeProducts = this.productService
            .getSearch(search)
            .subscribe({
              next: (data) => {
                this.products = data;
                this.isLoadedData = true;
                this.titlePage = `Результаты поиска по запросу ${search}`;

                if (data.length === 0) {
                  this.isNotProducts = true;
                }
              },
            });
        } else {
          this.subscribeProducts = this.productService.getAll().subscribe({
            next: (data: ProductType[]) => {
              this.products = data;
              this.isLoadedData = true;
              this.titlePage = 'Наши чайные коллекции';
            },
          });
        }
      },
    });
  }

  ngOnDestroy(): void {
    this.subscribeSearch?.unsubscribe();
    this.subscribeProducts?.unsubscribe();
  }
}
