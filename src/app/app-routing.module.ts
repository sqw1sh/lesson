import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './shared/components/layout/layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./views/main/main.module').then((m) => m.MainModule),
      },
      {
        path: '',
        loadChildren: () =>
          import('./views/collection/collection.module').then(
            (m) => m.CollectionModule
          ),
      },
      {
        path: '',
        loadChildren: () =>
          import('./views/order/order.module').then((m) => m.OrderModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
