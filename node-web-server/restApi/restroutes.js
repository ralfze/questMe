// Resouce for writing
// https://www.tutorialspoint.com/expressjs/expressjs_restful_apis.htm

const express = require("express");
const router = express.Router();

const keycloak = require("./keycloak-config").initKeycloak();

//router.mongoURL = "mongodb://localhost:27017";
router.mongoURL = "mongodb://mongodb:27017";

// MongoDb Client Setup
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectId;
const dbName = "corpus";
const cName = "dataC";
const allName = "allgemein";
const einstName = "einstellungen";

// bot

//// GET ///////////////////////////////////////////////////////////////////////////

// (OLD) GET one (for compatibility with current angular setup)
router.get("/corpus", keycloak.protect("admin"), function (req, res) {
  // Mongo Client
  const client = new MongoClient(router.mongoURL, { useUnifiedTopology: true });

  // connect to mongodb
  client.connect(function (err) {
    if (err) throw err;
    //res.json({ Message: "Connection close" });
    // choose db 'corpus"
    const db = client.db(dbName);

    // query collection 'dataC'
    db.collection(cName).findOne({}, function (err, result) {
      if (err) throw err;
      client.close();
      // Return corpus in json format
      console.log(result);
      res.json(result);
    });
  });
});

// GET all Database Entries
router.get("/corpus/all", keycloak.protect("admin"), function (req, res) {
  // Mongo CLient
  const client = new MongoClient(router.mongoURL, { useUnifiedTopology: true });

  // Connect to MongoDB
  client.connect(function (err) {
    if (err) throw err;
    // Choose db "corpus"
    const db = client.db(dbName);

    // Query Collection "dataC"
    db.collection(cName)
      .find({})
      .toArray(function (err, result) {
        if (err) throw err;
        client.close();
        // Return all Entries as JSON
        res.status(200).send(result);
      });
  });
});

// GET by ID
router.get("/corpus/id/:id", keycloak.protect("admin"), function (req, res) {
  // Get ID
  const { id } = req.params;

  if (ObjectId.isValid(id)) {
    // Mongo CLient
    const client = new MongoClient(router.mongoURL, {
      useUnifiedTopology: true,
    });

    // Connect to MongoDB
    client.connect(function (err) {
      if (err) throw err;
      // Choose db "corpus"
      const db = client.db(dbName);

      // Query Collection "dataC"
      db.collection(cName).findOne(
        { _id: ObjectId(id) },
        function (err, result) {
          if (err) throw err;
          client.close();
          // Return Entry as JSON
          res.status(200).send(result);
        }
      );
    });
  } else {
    res.status(500).send({ error: "Need a valid ObjectId" });
  }
});

// GET by Name
router.get(
  "/corpus/name/:name",
  keycloak.protect("admin"),
  function (req, res) {
    // Get name
    const { name } = req.params;

    // Mongo CLient
    const client = new MongoClient(router.mongoURL, {
      useUnifiedTopology: true,
    });

    // Connect to MongoDB
    client.connect(function (err) {
      if (err) throw err;
      // Choose db "corpus"
      const db = client.db(dbName);

      // Query Collection "dataC"
      db.collection(cName).findOne({ name: name }, function (err, result) {
        if (err) throw err;
        client.close();
        // Return Entry as JSON
        res.status(200).send(result);
      });
    });
  }
);

// GET by Collection
router.get(
  "/corpus/collection/:collection",
  keycloak.protect("admin"),
  function (req, res) {
    // Get name
    const { collection } = req.params;

    // Mongo CLient
    const client = new MongoClient(router.mongoURL, {
      useUnifiedTopology: true,
    });

    // Connect to MongoDB
    client.connect(function (err) {
      if (err) throw err;
      // Choose db "corpus"
      const db = client.db(dbName);

      // Query Collection
      db.collection(collection).findOne({}, function (err, result) {
        if (err) throw err;
        client.close();
        // Return Entry as JSON
        res.status(200).send(result);
      });
    });
  }
);

//// POST ///////////////////////////////////////////////////////////////////////////

// Add a new Corpus
router.post("/corpus", keycloak.protect("admin"), function (req, res) {
  // Mongo Client
  const client = new MongoClient(router.mongoURL, { useUnifiedTopology: true });

  // Connect to MongoDB
  client.connect(function (err) {
    if (err) throw err;
    // Choose db "corpus"
    const db = client.db(dbName);

    // Add new corpus to Collection "dataC"
    db.collection(cName).insertOne(req.body, function (err, result) {
      if (err) throw err;
      client.close();
      res.status(201).json(result);
    });
  });
});

// Add a new Intent
router.post("/corpus/intent", keycloak.protect("admin"), function (req, res) {
  // Mongo Client
  const client = new MongoClient(router.mongoURL, { useUnifiedTopology: true });

  // Sent new Intent
  let tmp = req.body;
  let intent = tmp.intent;
  let utterances = tmp.utterances;
  let answers = tmp.answers;

  // Connect to MongoDB
  client.connect(function (err) {
    if (err) throw err;
    // Choose db "corpus"
    const db = client.db(dbName);

    // Add new corpus to Collection "dataC"
    db.collection(cName).updateOne(
      {},
      {
        $push: {
          data: {
            intent: intent,
            utterances: utterances,
            answers: answers,
          },
        },
      },
      function (err, result) {
        if (err) throw err;
        client.close();
        res.status(201).json(result);
      }
    );
  });
});
//// PUT ///////////////////////////////////////////////////////////////////////////

// Replace a Corpus by ID
router.put("/corpus/id/:id", keycloak.protect("admin"), function (req, res) {
  // Get ID
  const { id } = req.params;

  if (ObjectId.isValid(id)) {
    // Mongo CLient
    const client = new MongoClient(router.mongoURL, {
      useUnifiedTopology: true,
    });

    // Connect to MongoDB
    client.connect(function (err) {
      if (err) throw err;
      // Choose db "corpus"
      const db = client.db(dbName);

      // Query Collection "dataC"
      db.collection(cName).replaceOne(
        { _id: ObjectId(id) },
        req.body,
        function (err, result) {
          if (err) throw err;
          client.close();
          // Return Result as JSON
          res.status(200).send(result);
        }
      );
    });
  } else {
    res.status(500).send({ error: "Need a valid ObjectId" });
  }
});

// Replace a Corpus by Name
router.put(
  "/corpus/name/:name",
  keycloak.protect("admin"),
  function (req, res) {
    // Get Name
    const { name } = req.params;

    // Mongo CLient
    const client = new MongoClient(router.mongoURL, {
      useUnifiedTopology: true,
    });

    // Connect to MongoDB
    client.connect(function (err) {
      if (err) throw err;
      // Choose db "corpus"
      const db = client.db(dbName);

      // Query Collection "dataC"
      db.collection(cName).replaceOne(
        { name: name },
        req.body,
        function (err, result) {
          if (err) throw err;
          client.close();
          // Return Result as JSON
          res.status(200).send(result);
        }
      );
    });
  }
);

// Replace a Corpus by Collection
router.put(
  "/corpus/collection/:collection",
  keycloak.protect("admin"),
  function (req, res) {
    // Get Collection
    const { collection } = req.params;

    // Mongo CLient
    const client = new MongoClient(router.mongoURL, {
      useUnifiedTopology: true,
    });

    // Connect to MongoDB
    client.connect(function (err) {
      if (err) throw err;
      // Choose db "corpus"
      const db = client.db(dbName);

      // Query Collection
      db.collection(collection).replaceOne({ name: req.body.name }, req.body, function (err, result) {
        if (err) throw err;
        client.close();
        // Return Result as JSON
        res.status(200).send(result);
      });
    });
  }
);

// Updates the given Intent
router.put("/corpus/intent", keycloak.protect("admin"), function (req, res) {
  // Mongo Client
  const client = new MongoClient(router.mongoURL, { useUnifiedTopology: true });

  // Sent new Intent
  let tmp = req.body;
  let intent = tmp.intent;
  let utterances = tmp.utterances;
  let answers = tmp.answers;

  // Connect to MongoDB
  client.connect(function (err) {
    if (err) throw err;
    // Choose db "corpus"
    const db = client.db(dbName);

    // Add new corpus to Collection "dataC"
    db.collection(cName).updateOne(
      {},
      {
        $set: {
          data: {
            intent: intent,
            utterances: utterances,
            answers: answers,
          },
        },
      },
      function (err, result) {
        if (err) throw err;
        client.close();
        res.status(201).json(result);
      }
    );
  });
});

//// DELETE ///////////////////////////////////////////////////////////////////////////

// Delete a Corpus
router.delete("/corpus/id/:id", keycloak.protect("admin"), function (req, res) {
  // Get ID
  const { id } = req.params;

  if (ObjectId.isValid(id)) {
    // Mongo CLient
    const client = new MongoClient(router.mongoURL, {
      useUnifiedTopology: true,
    });

    // Connect to MongoDB
    client.connect(function (err) {
      if (err) throw err;
      // Choose db "corpus"
      const db = client.db(dbName);

      // Query Collection "dataC"
      db.collection(cName).deleteOne(
        { _id: ObjectId(id) },
        function (err, result) {
          if (err) throw err;
          client.close();
          // Return Entry as JSON
          res.status(202).send(result);
        }
      );
    });
  } else {
    res.status(500).send({ error: "Need a valid ObjectId" });
  }
});

// Add a new Intent
router.delete("/corpus/intent", keycloak.protect("admin"), function (req, res) {
  // Mongo Client
  const client = new MongoClient(router.mongoURL, { useUnifiedTopology: true });

  // Sent new Intent
  let nIntent = req.body;
  let intent = nIntent.intent;

  // Connect to MongoDB
  client.connect(function (err) {
    if (err) throw err;
    // Choose db "corpus"
    const db = client.db(dbName);

    // Add new corpus to Collection "dataC"
    db.collection(cName).updateOne(
      {},
      {
        $pull: {
          data: {
            intent,
          },
        },
      },
      function (err, result) {
        if (err) throw err;
        client.close();
        res.status(201).json(result);
      }
    );
  });
});

// Restart Bot /////////////////////////////////////////

router.post("/bot/restart", keycloak.protect("admin"), function (req, res) {
  if (req.body.key !== 12345) {
    res.status(401).json("Not accessible");
  } else {
    console.log("Restarting Bot");
    // Mongo Client
    const client = new MongoClient(router.mongoURL, {
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

        // Remove the Corpus from the Bot
        router.nlp.nluManager.domainManagers["de"].stemDict = {};
        router.nlp.nluManager.domainManagers["de"].intentDict = {};
        router.nlp.nluManager.domainManagers["de"].sentences = [];
        router.nlp.nlgManager.responses.de = {};
        // console.log(router.nlp.nluManager.intentDomains);
        // Add Corpus
        await router.nlp.addCorpus(result);
        //console.log(result);
        // Start Bot
        await router.nlp.train();

        // Close DB connection
        client.close();
      });
    });
    console.log("Finished");
    res.status(201).json("Accessible");
  }
});


//// Allgemein Routes ////////////////////////////////////////////////////////////////////////////////

// Retrieve the AllgemeinData
router.get("/allgemein", function (req, res) {
  // Mongo Client
  const client = new MongoClient(router.mongoURL, {
    useUnifiedTopology: true,
  });

  // connect to mongodb
  client.connect(function (err) {
    if (err) throw err;
    //res.json({ Message: "Connection close" });
    // choose db 'corpus"
    const db = client.db(dbName);

    // query collection 'dataC'
    db.collection(allName).findOne({}, function (err, result) {
      if (err) throw err;

      // Return corpus in json format
      //console.log(result);
      res.json(result);
      client.close();
    });
  });
});

// PUT
router.put("/allgemein", keycloak.protect("admin"), function (req, res) {
  // Mongo Client
  const client = new MongoClient(router.mongoURL, {
    useUnifiedTopology: true,
  });

  // Sent new AllgemeinData
  let tmp = req.body.sendData;
  console.log(tmp);
  // Connect to MongoDB

  client.connect(function (err) {
    if (err) throw err;
    // Choose db "corpus"
    const db = client.db(dbName);
    //console.log(tmp);

    // Add new corpus to Collection "dataC"
    db.collection(allName).updateOne(
      {},
      { $set: { botName: tmp.botName, selectedIcon: tmp.selectedIcon } },
      function (err, result) {
        if (err) throw err;
        res.status(201).json(result);
        client.close();
      }
    );
  });
});

//// Einstellungen Routes ////////////////////////////////////////////////////////////////////////////////

// Retrieve the EinstData
router.get("/einstellungen", keycloak.protect("admin"), function (req, res) {
  // Mongo Client
  const client = new MongoClient(router.mongoURL, {
    useUnifiedTopology: true,
  });

  // connect to mongodb
  client.connect(function (err) {
    if (err) throw err;
    //res.json({ Message: "Connection close" });
    // choose db 'corpus"
    const db = client.db(dbName);

    // query collection 'dataC'
    db.collection(einstName).findOne({}, function (err, result) {
      if (err) throw err;

      // Return corpus in json format
      //console.log(result);
      res.json(result);
      client.close();
    });
  });
});

// PUT
router.put("/einstellungen", keycloak.protect("admin"), function (req, res) {
  // Mongo Client
  const client = new MongoClient(router.mongoURL, {
    useUnifiedTopology: true,
  });

  // Sent new EinstData
  let tmp = req.body.sendData;
  console.log(tmp);
  // Connect to MongoDB

  client.connect(function (err) {
    if (err) throw err;
    // Choose db "corpus"
    const db = client.db(dbName);
    //console.log(tmp);

    // Add new corpus to Collection "dataC"
    db.collection(einstName).updateOne(
      {},
      {
        $set: {
          professor: tmp.professor,
          student: tmp.student,
          unbekannt: tmp.unbekannt,
        },
      },
      function (err, result) {
        if (err) throw err;
        res.status(201).json(result);
        client.close();
      }
    );
  });
});
module.exports = router;
