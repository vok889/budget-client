import { Routes } from '@angular/router';
import { DemoComponent } from './budget/components/demo/demo.component';

export const routes: Routes = [
    { path: 'budget', loadChildren: () => import('./budget/budget.routes') },
    { path: 'demo', component: DemoComponent},
  ];
