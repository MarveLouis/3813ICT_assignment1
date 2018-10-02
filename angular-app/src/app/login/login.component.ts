import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public username:string;
  private password:string;
  public email:string;
  public role:string;
  public users;

  constructor(private router:Router, private form:FormsModule, private _userService:UserService) { }

  ngOnInit() {
    console.log(sessionStorage);
    
    if(sessionStorage.getItem("username") != null) {
      alert("You're already logged in.");
      this.router.navigateByUrl('/chat');
    } else {
      this.getUsers();
    }
  }

    getUsers() {
      console.log("Getting user data");
      this._userService.getUsers().subscribe(
        data => { this.users = data; sessionStorage.setItem("users", this.users); },
        err => console.error(err),
        () => console.log(this.users)
      )
      console.log(sessionStorage);
    }

  loginUser(event) {
    event.preventDefault();

    if(typeof(Storage) !== "undefined") {
      for (let user of this.users) {
        if (user.name == this.username && user.pwd == this.password) {
          sessionStorage.setItem("username", this.username);
          sessionStorage.setItem("role", user.role);
          this.router.navigate(['/chat']);
        }
      }
      if (sessionStorage.getItem("username") == undefined) {
        alert("Incorrect Username/Password");
      }
    } 
  }


}
