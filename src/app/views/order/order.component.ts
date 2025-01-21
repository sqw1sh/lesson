import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CartService } from 'src/app/shared/services/cart.service';
import { FormValidatorsService } from 'src/app/shared/services/form-validators.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit, OnDestroy {
  public isFailedResponse: boolean = false;
  public isCoolResponse: boolean = false;
  public subscribeRequest: Subscription | null = null;
  private fb: FormBuilder = new FormBuilder();

  public form: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    phone: ['', [Validators.required]],
    country: ['', [Validators.required]],
    zip: ['', [Validators.required]],
    address: ['', [Validators.required]],
    product: [''],
    comment: [''],
  });

  constructor(
    private cartService: CartService,
    private formValidator: FormValidatorsService,
    private router: Router,
    private http: HttpClient
  ) {}

  get name() {
    return this.form.get('name');
  }

  get lastName() {
    return this.form.get('lastName');
  }

  get phone() {
    return this.form.get('phone');
  }

  get country() {
    return this.form.get('country');
  }

  get zip() {
    return this.form.get('zip');
  }

  get address() {
    return this.form.get('address');
  }

  get product() {
    return this.form.get('product');
  }

  get comment() {
    return this.form.get('comment');
  }

  ngOnInit(): void {
    if (this.cartService.product.title.length > 0) {
      this.product?.setValue(this.cartService.product.title);
      this.name?.addValidators(this.formValidator.onlyWord);
      this.lastName?.addValidators(this.formValidator.onlyWord);
      this.phone?.addValidators(this.formValidator.phoneNumber);
      this.address?.addValidators(this.formValidator.address);
      this.product?.disable();
    } else {
      this.router.navigate(['/catalog']);
    }
  }

  public createOrder(): void {
    this.subscribeRequest = this.http
      .post<{ success: number }>('https://testologia.ru/order-tea', {
        name: this.name?.value,
        last_name: this.lastName?.value,
        phone: this.phone?.value,
        country: this.country?.value,
        zip: this.zip?.value,
        product: this.product?.value,
        address: this.address?.value,
        comment: this.comment?.value,
      })
      .subscribe({
        next: (data) => {
          if (data.success) {
            this.isCoolResponse = true;
          } else {
            this.isFailedResponse = true;
          }
        },
      });
  }

  ngOnDestroy(): void {
    this.subscribeRequest?.unsubscribe();
  }
}
