import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public username:string;
  public email:string;
  public role:string;

  constructor(private router:Router, private form:FormsModule, private http: HttpClient) { }

  ngOnInit() {
    console.log(sessionStorage);
    
    if(sessionStorage.getItem("username") != null) {
      alert("You're already logged in.");
      this.router.navigateByUrl('/chat');
    }
  }

  public loginUser(event) {
    event.preventDefault();

    if (this.username === "" && this.email === "") {
      alert("Username and Email cannot be empty.");
      return;
    } else if (typeof(Storage) !== "undefined") {
      const req = this.http.post('http://localhost:3000/api/auth', {
        username: this.username,
        email: this.email,
      })

      .subscribe((data: any) => {
        if (data.success) {
          alert("Login Successful.");
          this.router.navigateByUrl('/chat');
          sessionStorage.setItem("username", data.username);
          sessionStorage.setItem("email", data.email);
          sessionStorage.setItem("role", data.role);
        } else {
          alert("Username and/or Email are incorrect.");
        }
      },
      err => {
        alert("An error has occured.");
        return;
      });
    } else {
      console.log("Storage broke");
      return;
    }

  }
}
