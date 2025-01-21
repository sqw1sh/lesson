import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CollectionRoutingModule } from './collection-routing.module';
import { CollectionComponent } from './collection/collection.component';
import { CollectionsComponent } from './collections/collections.component';
import { CollectionCardComponent } from './collection-card/collection-card.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductService } from 'src/app/shared/services/product.service';
import { TextCutPipe } from 'src/app/shared/pipes/text-cut.pipe';

@NgModule({
  declarations: [
    CollectionComponent,
    CollectionsComponent,
    CollectionCardComponent,
    TextCutPipe,
  ],
  imports: [CommonModule, CollectionRoutingModule, HttpClientModule],
  providers: [ProductService],
})
export class CollectionModule {}
