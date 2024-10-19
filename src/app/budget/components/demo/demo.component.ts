import { JsonPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { filter, interval, of, startWith, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-demo',
  standalone: true,
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './demo.component.html',
  styleUrl: './demo.component.scss'
})
export class DemoComponent {

  // finit observable "of([])" is observable data type
  numbers$ = of([1, 2, 3, 4, 5])
  numbers:number[] = []

  httpClient = inject(HttpClient)
  users: any

  // infinit observable
  clock$ = interval(1000 * 1)
  now = new Date


  sideEffect = ''

  // initial value
  inputBox = new FormControl<string>('Angular')
  outputText = ''

  post: any

  constructor() {
    // # 1 data is static data
    // numbers$ is observable because of create variable by "of([])"
    // vs is observer because of subscribe
    this.numbers$.subscribe(vs => this.numbers = vs)

    // # 2 data is dynamic data form api
    // httpClient is observable because of create variable by "get(url)"
    // vs is observer because of subscribe
    this.httpClient.get('https://jsonplaceholder.typicode.com/users/2').subscribe(vs => this.users = vs)

    // # 3 data is dynamic data form time update
    // clock$ is observable because of create variable by "interval()"
    // v is observer because of subscribe
    this.clock$.subscribe(v => this.now = new Date())

    // function in pipe can view in document https://rxjs.dev/guide/operators
    this.inputBox.valueChanges.pipe(
      startWith(this.inputBox.value),
      filter((v) => v != null),
      tap((v) => this.sideEffect = v?.toUpperCase())
    ).subscribe(v => this.outputText = v)


    // # 5
    /*
    of(1)
      .pipe(
        switchMap(v => this.httpClient.get<any>(`https://jsonplaceholder.typicode.com/posts/${v}`) )
      )
      as a Observable
    */
    // (v => this.post = v) as a คนสังเกต
    of(2) // as a post.id
      .pipe(
        switchMap(v => this.httpClient.get<any>(`https://jsonplaceholder.typicode.com/posts/${v}`) )
      )
      .subscribe(v => this.post = v)
  }
  

}
