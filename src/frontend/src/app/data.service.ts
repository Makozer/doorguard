import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http: HttpClient) {}

  // TODO whole log pfad!
  getData(everything:boolean = false): Observable<any> {
    if (everything) {
      return this.http.get('http://127.126.124.123:3333/database/events');
    } 
    return this.http.get('http://127.126.124.123:3333/database/events');
  }
}