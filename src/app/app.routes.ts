import { Routes } from '@angular/router';
import { ItemEntryComponent } from './budget/pages/item-entry/item-entry.component';

export const routes: Routes = [
  { path: 'budget', loadChildren: () => import('./budget/budget.routes') }
];