const { dockStart } = require('@nlpjs/basic');

// Connection String for mongoDB
//const connString = process.env.MONGODB_CONNSTRING;

// Alias mongodb for Address in Docker Container
// Host "mongodb://localhost:27017" Docker "mongodb://mongodb:27017
const connString = "mongodb://mongodb:27017";

const restPort = 3001;

// Connection String for mongoDB
//const connString = process.env.MONGODB_CONNSTRING;

// Alias mongodb for Address in Docker Container
// Host "mongodb://localhost:27017" Docker "mongodb://mongodb:27017
//const connString = "mongodb://localhost:27017";
const connString = "mongodb://mongodb:27017";

const restPort = 3001;

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
  console.log(connString);
  //Database mongoDB
  const MongoClient = require("mongodb").MongoClient;

  //const fs = require("fs");
  const dbName = "corpus";
  const cName = "dataC";

  const client = new MongoClient(connString, {
    useUnifiedTopology: true,
  });

  // connect to mongodb
  client.connect(function (err) {
    if (err) throw err;
    // choose db 'corpus"
    const db = client.db(dbName);

    // query collection 'dataC'
    db.collection(cName).findOne({}, async function (err, result) {
      if (err) throw err;

      // Adds the Corpus to the ChatBot
      console.log("Add Corpus");

      // Add Corpus
      await nlp.addCorpus(result);
      //console.log(result);
      // Start Bot
      await nlp.train();

      // Close DB connection
      client.close();
    });
  });

  /*


  // Client for mongoDb
  const client = new MongoClient(connString, {
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

    getDocuments(db, async function (docs) {
      //const result = fs.writeFileSync("out.json", JSON.stringify(docs[0]));
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
  };*/

  // mongoDB
  // const database = dock.get('database');
  // await database.connect();
  //const result = database.find();
  //console.log(result);

  // Rest Api ///////////////////////////////////////
  const { RestApi } = require("./restApi/index");
  let rest = new RestApi(connString, nlp);
  rest.start();

  // END Rest Api ///////////////////////////////////////

  // SOCKET.IO ///////////////////////////////////////
  const { SocketioConnector } = require('./socketioConnector/index');

  // gets the 'default' container (has all containers nlp,core,...)
  container = dock.getContainer();
  container.use(SocketioConnector, "socketio", SocketioConnector.isSingleton);

  // start the module
  container.start();

  // END SOCKET IO ///////////////////////////////////////
})();
