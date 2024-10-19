import { Routes } from '@angular/router';
import { DemoComponent } from './budget/components/demo/demo.component';
import { loggedInGuard } from './auth/guards/logged-in.guard';

export const routes: Routes = [
    { 
      path: 'budget', 
      loadChildren: () => import('./budget/budget.routes'),
      canActivate: [loggedInGuard] 
    },
    { path: 'auth', loadChildren: () => import('./auth/auth.routes') }, // add for login
    { path: 'demo', component: DemoComponent},
  ];