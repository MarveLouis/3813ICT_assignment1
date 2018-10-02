import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private api:string = 'http://localhost:3000/api/'

  constructor(private http:HttpClient) { }

  //handle reading user data
  getUsers() {
    console.log("user service getUsers");
    return this.http.get(this.api + 'users');
  }

  //handle user creation
  createUser(user) { 
    let body = JSON.stringify(user);
    return this.http.post(this.api + 'user/', body, httpOptions);
  }

  //handle user deletion
  deleteUser(user) {
    return this.http.delete(this.api + 'user/' + user._id);
  }

  //handle user update
  updateUser(user) {
    let body = JSON.stringify(user);
    return this.http.put(this.api + 'user/' + user._id, body, httpOptions);
  }

}
