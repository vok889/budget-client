import { Component, inject } from '@angular/core';
import { Item, ItemStatus } from '../../models/item';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ItemService } from '../../item.service';

@Component({
  selector: 'app-item-entry',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './item-entry.component.html',
  styleUrl: './item-entry.component.scss'
})
export class ItemEntryComponent {

  isSmallTable = false;
  itemService = inject( ItemService);

  items: Item[] = [];

  filterItems = this.items;
  filterInput = new FormControl<string>('', { nonNullable: true })

  constructor() {

    this.itemService.datalist().subscribe(vs => {
      this.items = vs;
      this.filterItems = vs;
    })

    this.filterInput.valueChanges
      .pipe(map(keyword => keyword.toLocaleLowerCase()))
      .subscribe(keyword => {
        const numericKeyword = parseInt(keyword, 10);

        this.filterItems = this.items.filter(item => item.title.toLocaleLowerCase().includes(keyword)
        || item.status.toLocaleLowerCase().includes(keyword)
        || item.amount === numericKeyword
      )
      })
  }
}
