import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {

  constructor(private router:Router, private http: HttpClient) { }

  groupname:string;
  dGroup:string;
  groups = [];

  ngOnInit() {
    if(!sessionStorage.getItem('username')) {
      console.log('Not valid login');
      alert("Please log in first.");
      this.router.navigateByUrl('home');
    } else if (sessionStorage.role != "super" && sessionStorage.role != "group") {
      alert("Access denied.");
      this.router.navigateByUrl('/chat');
    }

    //Get group data
    const req = this.http.post('http://localhost:3000/api/groups', {
    })
    .subscribe((data: any) => {
        if (data.groupData) {
          this.groups = data.groupData;
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

  //Delete a group
  public deleteGroup(dGroup) {
    if(dGroup) { 
      event.preventDefault();
      console.log(dGroup);
      const req = this.http.post('http://localhost:3000/api/delgroup', {
        groupname: this.dGroup
      })
      .subscribe((data: any) => {
        console.log(data);
        console.log(data.success);
        if (data.success) {
          alert('Group deleted.');
          this.dGroup = '';
          const req = this.http.post('http://localhost:3000/api/groups', {
          })
          .subscribe((data: any) => {
            if (data.groupData) {  
              this.groups = data.groupData;
            } else {
              alert('Error!');
              return;
            }
          })
        }
      },
      err => {
        alert('An error has occured trying to delete group.')
        console.log("Error occured", err);
        return;
      });
    } else {
      alert("Selecet a group to delete.");
    }
  }

  //Create a new group
  public createGroup(event) {
    event.preventDefault();
    console.log(this.groupname);
      if(this.groupname === ""){
        alert("Please fill in all the fields.");
      }else{
        const req = this.http.post('http://localhost:3000/api/reggroup', {
          groupname: this.groupname,
          })
            .subscribe((data: any) => {
                if (data.success) {
                  alert('Group created.');
                  this.groupname = '';
                  const req = this.http.post('http://localhost:3000/api/groups', {
                    })
                      .subscribe((data: any) => {
                          if (data.groupData) {
                            this.groups = data.groupData;
                          } else {
                            alert('Error!');
                            return;
                          }
                        },
                        err => {
                          alert('An error has occured trying to create group.')
                          console.log("Error occured");
                          return;
                        });
                } else {
                  alert('Error!');
                  return;
                }
              },
              err => {
                alert('An error has occured trying to create group.')
                console.log("Error occured");
                return;
              });
            }
    
  }
  


}
