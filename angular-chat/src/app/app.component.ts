import { Component, ElementRef, ViewChild } from '@angular/core';
//import { send } from 'process';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild("chatListContainer", { static: false}) chatListContainer: ElementRef;
  chatInputMessage: string = "";

  currentUser = {
    name: 'John Wick',
    id: 1,
    profileImageUrl:'https://m.media-amazon.com/images/M/MV5BMDE0ZjMzOTAtMzU2OS00ZDVmLWFlMjYtMThlOWYwMDBiN2E3XkEyXkFqcGdeQWFsZWxvZw@@._V1_.jpg'
  }

  user1 = {
    name: 'ChatBot',
    id: 2,
    profileImageUrl:
    'https://image.shutterstock.com/image-vector/cat-robot-cartoon-vector-icon-260nw-1801648348.jpg'
  }

  /*user2 = {
    name: 'Keanu Reeves',
    id: 3
  }*/



  chatMessages: {
    user: any;
    message: string;
    created_at: number;
  }[] = [
    {
      user: this.currentUser,
      message: 'Hey, whats the mission?',
      created_at: Date.now()
    },
    {
      //ChatBot
      user: this.user1,
      message: 'No mission yet approved',
      created_at: Date.now()
    },
    /*{
      user: this.user2,
      message: 'Than I am going off for a while'
    }*/
    {
      user: this.currentUser,
      message: '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."',
      created_at: Date.now()
    }
  ];

  title = 'angular-chat';

  ngAfterViewChecked(){
    this.scrollToBottom();
  }

  send() {
    // chatInputMessage: string = ""
    this.chatMessages.push({
     message: this.chatInputMessage,
     user: this.currentUser,
     created_at: Date.now()
    });
    this.chatInputMessage = '';
    this.scrollToBottom();
    }

  scrollToBottom() {
    //let chatListContainer = document.getElementById('chat-list');
    //chatListContainer.scrollTop = chatListContainer?.scrollHeight;

    this.chatListContainer.nativeElement.scrollTop =
    this.chatListContainer.nativeElement.scrollHeight;
  }
}

