import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { GroupService } from '../group.service';


@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {

  constructor(private router:Router, private http: HttpClient, private _groupService: GroupService) { }

  public groupname:string;
  public users;
  public groups;

  //check if user is logged in and privilege level
  ngOnInit() {
    if(!sessionStorage.getItem('username')) {
      console.log('Not valid login');
      alert("Please log in first.");
      this.router.navigateByUrl('home');
    } else if (sessionStorage.role == "1") {
      alert("Access denied.");
      this.router.navigateByUrl('/chat');
    } else {
      this.getGroups();
    }
  }
  
  //read all group data
  getGroups() {
    console.log("Getting groups");
    this._groupService.getGroups().subscribe(
    data => { this.groups = data; },
    err => console.error(err),
    () => console.log(this.groups)
    );
}

  //create new group with admin as current user
  createGroup(groupname) {
    let group = {
      groupname: groupname,
      admin: sessionStorage.getItem("username"),
    }

    this._groupService.createGroup(group).subscribe(
      data => {
        this.getGroups();
        return true;
      },
      errpr => {
        console.error("Error creating group");
      }
    )
  }

  //delete existing group
  deleteGroup(group) {
    this._groupService.deleteGroup(group).subscribe(
      data => {
        this.getGroups();
        return true;
      },
      error => {
        console.error("Error deleting group");
      }
    )
  }

  //update existing group
  updateGroup(group) {
    this._groupService.updateGroup(group).subscribe(
      data => {
        this.getGroups();
        return true;
      },
      error => {
        console.error("Error updating group");
      }
    )
  }


}
