import { HttpClient } from '@angular/common/http';
import { Injectable ,inject} from '@angular/core';
import { CreateItem, EditItem, Item, ItemStatus } from './models/item';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  readonly URL = 'http://localhost:3000/items';
  private httpClient = inject( HttpClient);

  constructor() { }

  datalist(): Observable<Item[]> {
    return this.httpClient.get<Item[]>(this.URL);
  }

  getdata(id: number) {
    return this.httpClient.get<Item>(`${this.URL}/${id}`)
  }

  adddata(item: CreateItem) {
    return this.httpClient.post<Item>(this.URL, item);
  }

  editdata(id: number, item: EditItem) {
    return this.httpClient.patch<Item>(`${this.URL}/${id}`, item);
  }

  deletedata(id: number) {
    return this.httpClient.delete<void>(`${this.URL}/${id}`);
  }

    // TODO: temp update by front-end
    approve(id: number) {
      return this.httpClient.patch<Item>(`${this.URL}/${id}`, { status: ItemStatus.APPROVED });
    }
  
    reject(id: number) {
      return this.httpClient.patch<Item>(`${this.URL}/${id}`, { status: ItemStatus.REJECTED });
    }
}
