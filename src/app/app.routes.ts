import { Routes } from '@angular/router';
import {AppLayoutComponent} from "./layout/app.layout.component";
import {AuthCallbackComponent} from "./core/componentes/auth/auth-callback.component";
import {AuthGuard} from "./core/guards/auth.guard";

export const routes: Routes = [
  {
    path: 'callback',
    component: AuthCallbackComponent,
  },
  {
    path: '',
    component: AppLayoutComponent,
    children: [
      {
        path: 'customers',
        canActivate: [AuthGuard],
        loadChildren: () => import('./pages/customers/customer.module').then(m => m.CustomerModule),
        data: {breadcrumb: 'Customers'}
      },
      {
        path: 'configurations',
        canActivate: [AuthGuard],
        loadChildren: () => import('./pages/configurations/configurations.module').then(m => m.ConfigurationsModule),
        data: {breadcrumb: 'Configurations'}
      },
    ],
  },
  { path: '**', redirectTo: '' },
];
