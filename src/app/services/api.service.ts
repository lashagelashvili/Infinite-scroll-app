import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getData(page: number): Observable<any> {
    return this.http.get(`http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${page}/20`)
    // .pipe(delay(3000))
  }
}
