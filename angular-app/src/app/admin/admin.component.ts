import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private router:Router, private http: HttpClient, private _userService: UserService) { }

  public username:string;
  private password:string;
  public role;
  public email:string;
  public users;

  dUser:string;

  ngOnInit() {
    if(!sessionStorage.getItem('username')) {
      console.log('Not valid login');
      alert("Please log in first.");
      this.router.navigateByUrl('home');
    } else if (sessionStorage.role != "3") {
      alert("Access denied.");
      this.router.navigateByUrl('/chat');
    } else {
      this.getUsers();
    }
  }

  getUsers() {
    console.log("Getting user data");
    this._userService.getUsers().subscribe(
      data => { this.users = data; },
      err => console.error(err),
      () => console.log(this.users)
    )
  }

  createUser(username, password, role) {
    let user = {
      name: username,
      pwd: password,
      role: role
    }
    this._userService.createUser(user).subscribe(
      data => {
        this.getUsers();
        return true;
      },
      error => {
        console.error("Error creating user");
      }
    )
  }

  deleteUser(user) {
    this._userService.deleteUser(user).subscribe(
      data => {
        this.getUsers();
        return true;
      },
      error => {
        console.error("Error deleting user");
      }
    )
  }

  updateUser(user) {
    this._userService.updateUser(user).subscribe(
      data => {
        this.getUsers();
        return true;
      },
      error => {
        console.error("Error updating user");
      }
    )
  }

}
