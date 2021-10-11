import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ServiceResponse } from '../models/serviceResponse';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl: string = environment.baseUrl;
  private currentUserSource = new ReplaySubject<User>(1);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient, private router: Router) { }

  login(model: any) {
    return this.http.post(this.baseUrl + 'users/login', model).pipe(
      map((response: ServiceResponse<User>) => {
        const user = response.data;
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.setCurrentUser(user);
        }
      })
    );
  }

  setCurrentUser(user: User) {
    if(user == null) return;
    user.role = this.getDecodedToken().role;
    this.currentUserSource.next(user);
  }

  getCurrentRole() {
    var user = localStorage.getItem('user');
    if (user) 
      return this.getDecodedToken().role;
  }

  getCurrentUser() {
    return localStorage.getItem('user');
  }

  getDecodedToken() {
    var user = localStorage.getItem('user');
    if (user) {
      var token = JSON.parse(localStorage.getItem('user')).token;
      return JSON.parse(atob(token.split('.')[1]));
    }
    return null;
  }

  getCurrentUsername() {
    var user = localStorage.getItem('user');
    if (user)
      return JSON.parse(localStorage.getItem('user')).username;

    return null;
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
    this.router.navigate(["/login"]);
  }
}
