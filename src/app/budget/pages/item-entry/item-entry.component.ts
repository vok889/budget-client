import { Component, inject } from '@angular/core';
import { Item, ItemStatus } from '../../models/item';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ItemService } from '../../item.service';
import { MobileFormatPipe } from '../../../shared/pipes/mobile-format.pipe';
import { DecimalPipe, Location } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-item-entry',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule,MobileFormatPipe, DecimalPipe, RouterLink],
  templateUrl: './item-entry.component.html',
  styleUrl: './item-entry.component.scss'
})
export class ItemEntryComponent {

  itemService = inject(ItemService)
  location = inject(Location);

  items: Item[] = [];

  isSmallTable = false;
  filterItems = this.items;

  filterInput = new FormControl<string>('', { nonNullable: true });


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
        || item.price === numericKeyword
        || item.amount === numericKeyword
        || item.contactMobileNo.toLocaleLowerCase().includes(keyword)
        || item.status.toLocaleLowerCase().includes(keyword)
      )
      })
  }
  onReload(): void {
    window.location.reload();
  }

  onDelete(id: number) {
    this.itemService.deletedata(id).subscribe(() => this.onReload());
  }
}
