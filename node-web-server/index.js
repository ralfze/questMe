const { dockStart } = require("@nlpjs/basic");

(async () => {
  const dock = await dockStart(); /*
  const database = dock.get('database');
  await database.connect();
  // Testing Database
  /*
  const collection = database.getCollection('items');
  const items = [];
  for (let i = 0; i < 100; i += 1) {
    const item = { num: i, mod: i % 10 };
    items.push(item);
  }
  await collection.insertMany(items);
  const actual = await collection.find({ mod: 3 });
  await database.disconnect();
  console.log(actual);
*/
  //,"ExpressApiServer","DirectlineConnector"
  // Socket IO Part
  // dock.containers displays all containers
  //const apiserver = dock.get("api-server");
  //const server = http.createServer(app);
  /*
  const express = require("express");
  const app = express();
  const http = require("http");
  const server = http.createServer(app);
  const { Server } = require("socket.io");
  const io = new Server(server);
  app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
  });

  io.on("connection", (socket) => {
    socket.on("chat message", (msg) => {
      io.emit("chat message", msg);
    });
  });

  server.listen(3001, () => {
    console.log("listening on *:3001");
  });
*/

  //////////////////////////////////////////////
  // Integrate own Modules
  // Needs Module Address
  // Needs the Docking container 'default'
  // Needs the use of container.use(Module,Module.name, Module.isSingleton)
  // some Modules need to be started like DirectLine start()

  //const { SocketioConnector } = require("./socketioConnector/index");

  // Check what is in the contaienrs of dock 'default'
  //console.log(dock.containers["default"]);

  //let container = dock.containers["default"];
  //container.use(SocketioConnector, "socketio", SocketioConnector.isSingleton);

  //console.log(dock.containers["default"]);
  // END Integrate own Modules

  //const { SocketioConnector } = require("./socketioConnector/index");

  // let container = dock.containers["default"];
  //container.use(SocketioConnector, "socketio", SocketioConnector.isSingleton);
  //const socket = dock.get("socketio");
  //socket.start();
  //console.log(dock.containers["default"]);

  // NLP Part
  const nlp = dock.get('nlp');
  await nlp.train();

  // SOCKET.IO ///////////////////////////////////////
  const { SocketioConnector } = require("./socketioConnector/index");
  // gets the 'default' container (has all containers nlp,core,...)
  let container = dock.getContainer();
  container.use(SocketioConnector, "socketio", SocketioConnector.isSingleton);
  // start the module
  container.start();
  // END SOCKET IO ///////////////////////////////////////
})();
