import { Routes } from '@angular/router';
import { DemoComponent } from './budget/components/demo/demo.component';

export const routes: Routes = [
    { path: 'budget', loadChildren: () => import('./budget/budget.routes') },
    { path: 'auth', loadChildren: () => import('./auth/auth.routes') }, // add for login
    { path: 'demo', component: DemoComponent},
  ];