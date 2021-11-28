const { dockStart } = require("@nlpjs/basic");

(async () => {
  const dock = await dockStart();

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
  // Load the Corpus

  // NLP Part
  const nlp = dock.get("nlp");
  
  //Database mongoDB
  const MongoClient = require("mongodb").MongoClient;
  //const fs = require("fs");
  const dbName = "corpus";
  
  // Alias mongodb for Address in Docker Container
  // Host "mongodb://localhost:27017" Docker "mongodb://mongodb:27017
  const client = new MongoClient("mongodb://mongodb:27017", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    connectTimeoutMS: 30000,
    keepAlive: 1,
  });
  // For debugging

  client.connect(function (err) {
    //assert.equal(null, err);
    console.log("Connected successfully to server");
    const db = client.db(dbName);

    getDocuments(db, function (docs) {
      //const result = fs.writeFileSync("out.json", JSON.stringify(docs[0]));
      (async () => {
        try {
          // Gets an Array and the first entity is the corpus
          // Adds the Corpus to the ChatBot
          console.log("Add Corpus");
          //console.log(docs);
          await nlp.addCorpus(docs[0]);

          // Start the Chatbot
          await nlp.train();

        } catch (e) {
          console.log(e);
        } finally {
          // Close DB connection
          console.log("Closing connection.");
          await client.close();
        }
      })();
    });
  });

  const getDocuments = function (db, callback) {
    const query = {}; // this is your query criteria
    db.collection("dataC")
      .find(query)
      .toArray(function (err, result) {
        if (err) throw err;
        callback(result);
      });
  };
  
  // mongoDB
 // const database = dock.get('database');
 // await database.connect();
  //const result = database.find();
  //console.log(result);

  // SOCKET.IO ///////////////////////////////////////
  const { SocketioConnector } = require("./socketioConnector/index");

  // gets the 'default' container (has all containers nlp,core,...)
  container = dock.getContainer();
  container.use(SocketioConnector, "socketio", SocketioConnector.isSingleton);

  // start the module
  container.start();

  // END SOCKET IO ///////////////////////////////////////
})();
