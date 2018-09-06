import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Chat App';

  constructor(private router: Router) { }

  logout() {
    event.preventDefault();
    if (!sessionStorage.username) {
      alert("You're not logged in.");
    } else {
      sessionStorage.clear();
      console.log(sessionStorage);
      alert("Logout successful.");
      this.router.navigateByUrl('');
    }
  }
}
