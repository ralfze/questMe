// Origin from https://github.com/pareshjoshi2468/chatbot/blob/master/chatbot-client/src/app/socket.service.ts
// Code was adjusted for this project

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import io from 'socket.io-client';

@Injectable()
export class SocketService {
  // here port from socket
  private socket = io('http://localhost:3000', {
    withCredentials: true,
    extraHeaders: {
      "secretHeader": "secret value"
    }
  });
  constructor() {
  }

  sendMessage(data: object) {
    this.socket.emit("private message", this.socket.id, data);
  }

  receivedReply() {
    const observable = new Observable<any>(observer => {
      this.socket.on("private message", function (anotherSocketId, data) {
        observer.next(data);
      });
      this.socket.on("connect", () => {
        console.log("You're connection status is: " + this.socket.connected); // true
      });
      this.socket.on("disconnect", () => {
        console.log("You're connection status is: " + this.socket.connected); // false
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }

}
