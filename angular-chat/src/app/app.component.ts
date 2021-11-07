// Origin from https://github.com/pareshjoshi2468/chatbot/blob/master/chatbot-client/src/app/app.component.ts
// Code was adjusted for this project

import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { SocketService } from './socket.service';
//import { send } from 'process';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'angular-chat';
  constructor(private socketService: SocketService) {

  }
  currentUser = {
    name: 'John Wick',
    id: 1,
    profileImageUrl: 'assets/img/MV5BMDE0ZjMzOTAtMzU2OS00ZDVmLWFlMjYtMThlOWYwMDBiN2E3XkEyXkFqcGdeQWFsZWxvZw@@._V1_.jpg'
  }

  bot = {
    name: 'ChatBot',
    id: 2,
    profileImageUrl:
      'assets/img/cat-robot-cartoon-vector-icon-260nw-1801648348.jpg'
  }
  // Chat Message Stack
  chatMessages: {
    user: any;
    message: string;
    created_at: number;
  }[] = [];

  // Chat Input Message Box
  chatInputMessage: string = "";

  @ViewChild("chatListContainer", { static: false }) chatListContainer: ElementRef;

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  //Function that is applied when AppComponent is initialized
  ngOnInit() {
    this.socketService.receivedReply().subscribe(data => {
      //console.log(data);
      // Bot Answer is added to the Chat Stack
      this.addMessage(data.outputMessage, this.bot);
    });

  }
  // Function to send a Message to the Bot
  sendMessage() {
    const data = { msg: this.chatInputMessage };
    this.socketService.sendMessage(data);
    this.addMessage(data.msg, this.currentUser);
    this.chatInputMessage = '';
    this.scrollToBottom();
  }

  // Function adds Message to the Chat Stack
  addMessage(msg: string, user: object) {
    this.chatMessages.push({
      message: msg,
      user: user,
      created_at: Date.now()
    });
  }

  scrollToBottom() {
    //let chatListContainer = document.getElementById('chat-list');
    //chatListContainer.scrollTop = chatListContainer?.scrollHeight;

    this.chatListContainer.nativeElement.scrollTop =
      this.chatListContainer.nativeElement.scrollHeight;
  }



}

