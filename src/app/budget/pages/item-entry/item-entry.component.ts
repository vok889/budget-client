import { Component } from '@angular/core';
import { Item, ItemStatus } from '../../models/item';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { map } from 'rxjs';

@Component({
  selector: 'app-item-entry',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './item-entry.component.html',
  styleUrl: './item-entry.component.scss'
})
export class ItemEntryComponent {
  items: Item[] = [
    {
      title: "Gaming Laptop",
      amount: 3,
      price: 3200,
      contactMobileNo: "0812345678",
      status: ItemStatus.APPROVED,
      id: 1
    },
    {
      title: "Desktop Tower",
      amount: 7,
      price: 2500,
      contactMobileNo: "0823456789",
      status: ItemStatus.PENDING,
      id: 2
    },
    {
      title: "Mechanical Keyboard",
      amount: 6,
      price: 750,
      contactMobileNo: "0834567890",
      status: ItemStatus.REJECTED,
      id: 3
    }
  ];

  isSmallTable = false;
  filterItems = this.items;
  filterInput = new FormControl<string>('', { nonNullable: true })

  constructor() {
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
