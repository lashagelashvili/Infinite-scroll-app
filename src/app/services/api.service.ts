import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { User, UserDetails, UserFriends } from './model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // currentuser: number;

  constructor(private http: HttpClient) { }

  getData(page: number): Observable<any> {
    return this.http.get(`http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${page}/20`)
    // .pipe(delay(3000))
  }

  getUserDetails(id: number): Observable<UserDetails> {
    return this.http.get<UserDetails>(`http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${id}`)
  }

  getFriends(id: number, page: number): Observable<UserFriends> {
    return this.http.get<UserFriends>(`http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${id}/friends/${page}/20`)
  }
}
