import { HttpClient } from '@angular/common/http';
import { Injectable ,inject} from '@angular/core';
import { CreateItem, Item } from './models/item';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  get(id: number) {
    throw new Error('Method not implemented.');
  }

  readonly URL = 'http://localhost:3000/items';
  private httpClient = inject( HttpClient);

  constructor() { }

  datalist(): Observable<Item[]> {
    return this.httpClient.get<Item[]>(this.URL);
  }

  adddata(item: CreateItem) {
    return this.httpClient.post<Item>(this.URL, item);
  }
}
