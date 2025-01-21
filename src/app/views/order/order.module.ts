import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderRoutingModule } from './order-routing.module';
import { OrderComponent } from './order.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormValidatorsService } from 'src/app/shared/services/form-validators.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [OrderComponent],
  imports: [
    CommonModule,
    OrderRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [FormValidatorsService],
})
export class OrderModule {}
