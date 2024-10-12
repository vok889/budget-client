import { Routes } from '@angular/router';
import { ItemEntryComponent } from './budget/pages/item-entry/item-entry.component';
import { ItemFormComponent } from './budget/pages/item-form/item-form.component';

export const routes: Routes = [
    { path: 'budget/item-entry', component: ItemEntryComponent, title: 'Entry' },
    { path: 'budget/item-add', component: ItemFormComponent, title: 'Add' }
];
