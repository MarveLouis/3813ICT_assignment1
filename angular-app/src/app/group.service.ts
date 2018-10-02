import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  private api:string = 'http://localhost:3000/api/'

  constructor(private http:HttpClient) { }

  getGroups() {
    console.log("group service getGroups");
    return this.http.get(this.api + 'groups');
  }

  createGroup(group) { 
    let body = JSON.stringify(group);
    return this.http.post(this.api + 'group/', body, httpOptions);
  }

  deleteGroup(group) {
    return this.http.delete(this.api + 'group/' + group._id);
  }

  updateGroup(group) {
    let body = JSON.stringify(group);
    return this.http.put(this.api + 'group/' + group._id, body, httpOptions);
  }



}
