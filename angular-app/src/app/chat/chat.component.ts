import { Component, OnInit } from '@angular/core';
import { SocketService } from '../socket.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})

export class ChatComponent implements OnInit {
  username: string;
  messages=[];
  message;
  connection;

  constructor(private sockServer: SocketService, private router:Router) { }

  ngOnInit() {
    if(!sessionStorage.getItem('username')){
      console.log('Not valid login');
      alert("Please log in first.");
      this.router.navigateByUrl('home');
    } else {
      this.username = sessionStorage.getItem('username');
      console.log("Chat session started for user: " + this.username);
      this.connection = this.sockServer.getMessages().subscribe(message=>{
        this.messages.push(message);
        this.message = '';
      });
    }
  }

  sendMessage(){
    this.sockServer.sendMessage('[' + this.username + ']: ' + this.message);
  }

  ngOnDestroy(){
    if(this.connection){
      this.connection.unsubscribe();
    }
  }

  logout(){
    sessionStorage.clear();
    this.router.navigateByUrl('home');
  }
}