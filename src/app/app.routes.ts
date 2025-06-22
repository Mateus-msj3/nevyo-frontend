import { Routes } from '@angular/router';
import {AppLayoutComponent} from "./layout/app.layout.component";
import {AuthCallbackComponent} from "./core/componentes/auth/auth-callback.component";
import {AuthGuard} from "./core/guards/auth.guard";
import {StoreSelectorComponent} from "./core/componentes/store-selector/store-selector.component";
import {StoreSelectedGuard} from "./core/guards/store-selected.guard";

export const routes: Routes = [
  {
    path: 'callback',
    component: AuthCallbackComponent,
  },
  {
    path: 'select-store',
    component: StoreSelectorComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '',
    component: AppLayoutComponent,
    canActivate: [AuthGuard, StoreSelectedGuard],
    children: [
      {
        path: 'customers',
        canActivate: [AuthGuard, StoreSelectedGuard],
        loadChildren: () => import('./pages/customers/customer.module').then(m => m.CustomerModule),
        data: {breadcrumb: 'Customers'}
      },
      {
        path: 'categories',
        canActivate: [AuthGuard, StoreSelectedGuard],
        loadChildren: () => import('./pages/categories/categories.module').then(m => m.CategoriesModule),
        data: {breadcrumb: 'Categories'}
      },
      {
        path: 'products',
        canActivate: [AuthGuard, StoreSelectedGuard],
        loadChildren: () => import('./pages/products/products.module').then(m => m.ProductsModule),
        data: {breadcrumb: 'Products'}
      },
      {
        path: 'kits',
        canActivate: [AuthGuard, StoreSelectedGuard],
        loadChildren: () => import('./pages/kits/kits.module').then(m => m.KitsModule),
        data: {breadcrumb: 'Kits'}
      },
      {
        path: 'stores',
        canActivate: [AuthGuard, StoreSelectedGuard],
        loadChildren: () => import('./pages/stores/store.module').then(m => m.StoreModule),
        data: {breadcrumb: 'Stores'}
      },
      {
        path: 'configurations',
        canActivate: [AuthGuard, StoreSelectedGuard],
        loadChildren: () => import('./pages/configurations/configurations.module').then(m => m.ConfigurationsModule),
        data: {breadcrumb: 'Configurations'}
      },
    ],
  },
  { path: '**', redirectTo: 'select-store' },
];
