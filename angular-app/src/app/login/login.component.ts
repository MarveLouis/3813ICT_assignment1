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

  constructor(private router:Router, private form:FormsModule, private _userService:UserService) { }

  ngOnInit() {
    console.log(sessionStorage);
    
    if(sessionStorage.getItem("username") != null) {
      alert("You're already logged in.");
      this.router.navigateByUrl('/chat');
    }
  }

  public loginUser(event) {
    event.preventDefault();

      let uData = {
        username: this.username,
        password: this.password
      }

      this._userService.login(uData).subscribe(data => {
        if(data != false) {
          let tData = JSON.stringify(data);
          sessionStorage.setItem('user', tData);
          this.router.navigate(['/chat']);
        } else {
          alert("Login failed.");
        }
      },
      error => {
        console.error(error);
      });
  }

}
