// Origin from https://github.com/pareshjoshi2468/chatbot/blob/master/chatbot-client/src/app/app.component.ts
// Code was adjusted for this project

import { Component, OnInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { SocketService } from './socket.service';
import { Title } from '@angular/platform-browser';
import { KeycloakService } from 'keycloak-angular';
import { ApiService } from '../admin-interface/api.service';
import { GeneralSettings } from '../admin-interface/general/general';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit, OnDestroy {
  // Subscriptions of the Bot
  subArray: Subscription[] = [];

  // Link Admin UI
  link : string = '/admin-interface';

  webtitle = 'Webchat';
  constructor(private socketService: SocketService, private title: Title, private keycloakService: KeycloakService, private apiService: ApiService) { }

  // DataModel of Allgmein Website
  generalData: GeneralSettings = {
    botName: '',
    selectedIcon: { name: '', condition: false, src: '' }
  };

  currentUser = {
    name: 'John Wick',
    id: 1,
    profileImageUrl:
      'assets/images/MV5BMDE0ZjMzOTAtMzU2OS00ZDVmLWFlMjYtMThlOWYwMDBiN2E3XkEyXkFqcGdeQWFsZWxvZw@@._V1_.jpg',
  };

  bot = {
    name: 'ChatBot',
    id: 2,
    profileImageUrl:
      'assets/images/cat-robot-cartoon-vector-icon-260nw-1801648348.jpg',
  };
  // Chat Message Stack
  chatMessages: {
    user: any;
    message: string;
    created_at: number;
    showLink: boolean;
  }[] = [];

  // Chat Input Message Box
  chatInputMessage: string = '';

  @ViewChild('chatListContainer', { static: false })
  chatListContainer!: ElementRef;
  // scroll automatically to bottom of the chat
  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  //Function that is applied when AppComponent is initialized
  ngOnInit() {
    this.title.setTitle(this.webtitle);
    let sub = this.socketService.receivedReply().subscribe((data) => {
      //console.log(data);
      // Bot Answer is added to the Chat Stack
      this.addMessage(data.outputMessage, this.bot, data.showLink);
      // Set Admin Link
    });
    this.subArray.push(sub);
    // Get the Info from the ChatBot
    this.refreshGeneral();
  }

  //Function that is applied when AppComponent is destroyed
  ngOnDestroy(): void {
    // unsubscribe the subscriptions
    this.subArray.forEach((subscription) => { subscription.unsubscribe() });
  }

  // Function to send a Message to the Bot
  sendMessage() {
    const data = { msg: this.chatInputMessage, roles: this.keycloakService.getUserRoles() };
    this.socketService.sendMessage(data);
    this.addMessage(data.msg, this.currentUser, false);
    this.chatInputMessage = '';
    this.scrollToBottom();
  }

  // Function adds Message to the Chat Stack
  addMessage(msg: string, user: object, showLink: boolean) {
    this.chatMessages.push({
      message: msg,
      user: user,
      created_at: Date.now(),
      showLink: showLink,
    });
  }

  //method to scroll to bottom
  scrollToBottom() {
    //let chatListContainer = document.getElementById('chat-list');
    //chatListContainer.scrollTop = chatListContainer?.scrollHeight;

    this.chatListContainer.nativeElement.scrollTop =
      this.chatListContainer.nativeElement.scrollHeight;
  }

  // Bot Methods
  changeBotName(s: string) {
    this.bot.name = s;
  }
  changeBotIcon(s: string) {
    this.bot.profileImageUrl = s;
  }

  /// REST API
  /**
   * Gets the AllgemeinData
   */
  refreshGeneral() {
    // Retrieve AllgemeinData
    let sub = this.apiService.getGeneral().subscribe(data => {
      console.log(data);
      // Retrieve the AllgmeinData
      this.generalData = data;
      // Change the Name of the Bot
      this.changeBotName(this.generalData.botName);
      // Change the Icon of the Bot
      this.changeBotIcon(this.generalData.selectedIcon.src);
    })
    this.subArray.push(sub);
  }
  // END REST API
}
