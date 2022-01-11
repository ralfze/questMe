/*
 * Copyright (c) AXA Group Operations Spain S.A.
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

const { containerBootstrap } = require('@nlpjs/core');

const { createServer } = require('http');
const { Server } = require('socket.io');
const { Connector } = require('@nlpjs/connector');

class SocketioConnector extends Connector {
  constructor(settings, container) {
    super(settings, container);
    if (this.settings.autoRemoveFiles === undefined) {
      this.settings.autoRemoveFiles = true;
    }
    if (this.settings.uploadDir === undefined) {
      this.settings.uploadDir = "./uploads/";
    }
    if (this.settings.maxFileSize === undefined) {
      this.settings.maxFileSize = 8000000;
    }
  }

  registerDefault() {
    this.container.registerConfiguration(
      "socketio",
      { log: true, channelId: "emulator" },
      false
    );
  }

  log(level, message) {
    if (this.settings.log) {
      this.container.get("logger")[level](message);
    }
  }
  start() {
    // get the express api server
    const app = this.container.get("api-server").app;
    if (!app) {
      throw new Error("No api-server found");
    }
    // get the nlp
    const nlp = this.container.get("nlp");
    if (!nlp) {
      throw new Error("No nlp found");
    }
    // create a http server from express
    const httpServer = createServer(app);
    // create a socketio server
    // here address from angular
    const io = new Server(httpServer,{
      cors: {
        origin: "http://localhost:4200",
        methods: ["PUT", "GET", "POST", "DELETE", "OPTIONS"],
        allowedHeaders:["secretHeader"],
        credentials: true
      }
      })

    // Event on connecting user
    io.on("connection", (socket) => {
      console.log(`connect ${socket.id}`);

      // Event on disconnecting user
      socket.on("disconnect", (reason) => {
        console.log(`disconnect ${socket.id} due to ${reason}`);
      });

      // Event on chat message
      socket.on("private message", (anotherSocketId, data) => {
        //io.to(anotherSocketId).emit("private message", socket.id, msg);

        // Process users request
        nlp.process('de', data.msg).then((result) => {
          const replyData = {
            outputMessage: result.answer,
          };
          io.to(anotherSocketId).emit("private message", socket.id, replyData);
        });
      });
    });
    // Listen to the Express Api Server with Socket.io
    httpServer.listen(3000, () => {
      console.log("Bot listening on *:3000");
    });
  }

}

module.exports = SocketioConnector;
