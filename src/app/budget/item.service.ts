import { HttpClient } from '@angular/common/http';
import { Injectable ,inject} from '@angular/core';
import { Item } from './models/item';
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
}
