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
      return this.http.get('http://192.168.1.95:3000/database/events');
    } 
    return this.http.get('http://192.168.1.95:3000/database/events');
  }
}