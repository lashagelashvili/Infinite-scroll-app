import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserDetails, UserFriends } from './model';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getData(page: number): Observable<UserFriends> {
    return this.http.get<UserFriends>(`http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${page}/20`)
  }

  getUserDetails(id: number): Observable<UserDetails> {
    return this.http.get<UserDetails>(`http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${id}`)
  }

  getFriends(id: number, page: number): Observable<UserFriends> {
    return this.http.get<UserFriends>(`http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${id}/friends/${page}/20`)
  }
}
