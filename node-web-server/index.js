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

  //Database mongoDB
  const MongoClient = require("mongodb").MongoClient;
  const fs = require("fs");
  const dbName = "corpus";
  const client = new MongoClient("mongodb://localhost:2717", {
    useUnifiedTopology: true,
  });

  client.connect(function (err) {
    //assert.equal(null, err);
    console.log("Connected successfully to server");
    const db = client.db(dbName);

    getDocuments(db, function (docs) {
      console.log("Closing connection.");
      client.close();
      // Write to file
      try {
        //fs.writeFileSync("out_file.json", JSON.stringify(docs[0]));
        console.log("Done writing to file.");
        //console.log(fs.readFileSync("out_file.json", "utf8"));
      } catch (err) {
        console.log("Error writing to file", err);
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
  };
  // let the Chatbot answer

  //END Database mongoDB
  /*
  // NLP Part
  const nlp = dock.get("nlp");
  // Load the Corpus

  // Add the created corpus
  console.log("Load Corpus");
  //const data = fs.readFileSync("out_file.json", "utf8");
  //console.log(data);
  console.log("Add Corpus");
  try {
    await nlp.addCorpus("out_file.json");
    // let the Chatbot answer
    await nlp.train();
  } catch (e) {
    console.log(e);
  }
*/
  // SOCKET.IO ///////////////////////////////////////
  const { SocketioConnector } = require("./socketioConnector/index");
  // gets the 'default' container (has all containers nlp,core,...)
  container = dock.getContainer();
  container.use(SocketioConnector, "socketio", SocketioConnector.isSingleton);
  // start the module
  container.start();
  // END SOCKET IO ///////////////////////////////////////
})();
