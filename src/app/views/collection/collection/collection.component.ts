import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CartService } from 'src/app/shared/services/cart.service';
import { ProductService } from 'src/app/shared/services/product.service';
import ProductType from 'src/app/types/product.type';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss'],
})
export class CollectionComponent implements OnInit, OnDestroy {
  public isLoadedData: boolean = false;
  public product: ProductType;
  private subscribeProduct: Subscription | null = null;
  private subscribeRoute: Subscription | null = null;

  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private cartService: CartService,
    private router: Router
  ) {
    this.product = {
      id: 0,
      image: '',
      title: '',
      price: 0,
      description: '',
    };
  }

  ngOnInit(): void {
    this.subscribeRoute = this.activatedRoute.params.subscribe({
      next: (param) => {
        if (!!param['id']) {
          this.subscribeProduct = this.productService
            .getOne(+param['id'])
            .subscribe({
              next: (data: ProductType) => {
                this.product = data;
                this.isLoadedData = true;
              },
            });
        }
      },
    });
  }

  ngOnDestroy(): void {
    this.subscribeRoute?.unsubscribe();
    this.subscribeProduct?.unsubscribe();
  }

  public createOrder(): void {
    this.cartService.product = this.product;
    this.router.navigate(['/order']);
  }
}
