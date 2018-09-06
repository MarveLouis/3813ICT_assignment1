import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private router:Router, private http: HttpClient) { }

  username:string;
  email:string;
  role:string;

  users = [];
  dUser:string;

  ngOnInit() {
    if(!sessionStorage.getItem('username')) {
      console.log('Not valid login');
      alert("Please log in first.");
      this.router.navigateByUrl('home');
    } else if (sessionStorage.role != "super") {
      alert("Access denied.");
      this.router.navigateByUrl('/chat');
    }

    //Get user data
    const req = this.http.post('http://localhost:3000/api/users', {
    })
    .subscribe((data: any) => {
        if (data.userData) {
          this.users = data.userData;
        } else {
          alert('Error!');
          return;
        }
      },
      err => {
        alert('An error has occured.')
        console.log("Error occured");
        return;
      });
  }

  //Delete a user
  public deleteUser(dUser) {
    if(dUser) { 
      event.preventDefault();
      console.log(dUser);
      const req = this.http.post('http://localhost:3000/api/del', {
        username: this.dUser
      })
      .subscribe((data: any) => {
        console.log(data);
        console.log(data.success);
        if (data.success) {
          alert('User deleted.');
          this.dUser = '';
          const req = this.http.post('http://localhost:3000/api/users', {
          })
          .subscribe((data: any) => {
            if (data.userData) {  
              this.users = data.userData;
            } else {
              alert('Error!');
              return;
            }
          })
        }
      },
      err => {
        alert('An error has occured trying to delete user.')
        console.log("Error occured", err);
        return;
      });
    } else {
      alert("Selecet a user to delete.");
    }
  }

  //Register a new user
  public registerUser(event) {
    event.preventDefault();
    console.log(this.username);
      if(this.username === "" || this.email === "" || this.role === ""){
        alert("Please fill in all the fields.");
      }else{
        const req = this.http.post('http://localhost:3000/api/reg', {
            username: this.username,
            email: this.email,
            role: this.role
          })
            .subscribe((data: any) => {
                if (data.success) {
                  alert('User registered.');
                  this.username = '';
                  this.email='',
                  this.role = '';
                  const req = this.http.post('http://localhost:3000/api/users', {
                    })
                      .subscribe((data: any) => {
                          if (data.userData) {
                            console.log('data', data.userData);
                            this.users = data.userData;
                            console.log('thisusers',this.users);
                          } else {
                            alert('Error!');
                            return;
                          }
                        },
                        err => {
                          alert('An error has occured trying to create user.')
                          console.log("Error occured");
                          return;
                        });
                } else {
                  alert('Error!');
                  return;
                }
              },
              err => {
                alert('An error has occured trying to create user.')
                console.log("Error occured");
                return;
              });
      }
    
  }
  


}
