// Resouce for writing
// https://www.tutorialspoint.com/expressjs/expressjs_restful_apis.htm

const express = require("express");
const router = express.Router();

//router.mongoURL = "mongodb://localhost:27017";
router.mongoURL = "mongodb://mongodb:27017";

// MongoDb Client Setup
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectId;
const dbName = "corpus";
const cName = "dataC";

// bot

//// GET ///////////////////////////////////////////////////////////////////////////

// (OLD) GET one (for compatibility with current angular setup)
router.get("/corpus", function (req, res) {
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
      res.json(result);
    });
  });
});

// GET all Database Entries
router.get("/corpus/all", function (req, res) {
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
router.get("/corpus/id/:id", function (req, res) {
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
router.get("/corpus/name/:name", function (req, res) {
  // Get name
  const { name } = req.params;

  // Mongo CLient
  const client = new MongoClient(router.mongoURL, { useUnifiedTopology: true });

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
});

// GET by Collection
router.get("/corpus/collection/:collection", function (req, res) {
  // Get name
  const { collection } = req.params;

  // Mongo CLient
  const client = new MongoClient(router.mongoURL, { useUnifiedTopology: true });

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
});

//// POST ///////////////////////////////////////////////////////////////////////////

// Add a new Corpus
router.post("/corpus", function (req, res) {
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
router.post("/corpus/intent", function (req, res) {
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
router.put("/corpus/id/:id", function (req, res) {
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
router.put("/corpus/name/:name", function (req, res) {
  // Get Name
  const { name } = req.params;

  // Mongo CLient
  const client = new MongoClient(router.mongoURL, { useUnifiedTopology: true });

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
});

// Replace a Corpus by Collection
router.put("/corpus/collection/:collection", function (req, res) {
  // Get Collection
  const { collection } = req.params;

  // Mongo CLient
  const client = new MongoClient(router.mongoURL, { useUnifiedTopology: true });

  // Connect to MongoDB
  client.connect(function (err) {
    if (err) throw err;
    // Choose db "corpus"
    const db = client.db(dbName);

    // Query Collection
    db.collection(collection).replaceOne({}, req.body, function (err, result) {
      if (err) throw err;
      client.close();
      // Return Result as JSON
      res.status(200).send(result);
    });
  });
});

// Updates the given Intent
router.put("/corpus/intent", function (req, res) {
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
router.delete("/corpus/id/:id", function (req, res) {
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
router.delete("/corpus/intent", function (req, res) {
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

router.post("/bot/restart", function (req, res) {
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

// Gets an Array and the first entity is the corpus
// Adds the Corpus to the ChatBot
//    console.log("Add Corpus");

// Remove the Corpus from the Bot
//router.nlp.nluManager.domainManagers["de"].stemDict = {};
//router.nlp.nluManager.domainManagers["de"].intentDict = {};
//router.nlp.nluManager.domainManagers["de"].sentences = {};

// Add Corpus
//await router.nlp.addCorpus(result);

// Start Bot
//await router.nlp.train();

// Close DB connection
// ALT ///////////////////////////////////////////////////////////////////////////////
/*
router.put("/corpus", function (req, res) {
  // Mongo Client
  const client = new MongoClient(router.mongoURL, {useUnifiedTopology: true});

  // Connect to MongoDB
  client.connect(function (err) {
    if (err) throw err;
    // res.json({ Message: "Connection close" });
    // Choose db 'corpus"
    const db = client.db(dbName);

    db.collection(cName).findOne({}, async function (err, result) {
      if (err) throw err;
      
      const filter = { _id: `${result._id}` };
      const id = result._id;
      const testJSON = {"a": 1};

      console.log("////////// testJSON //////////");
      console.log(testJSON);
      console.log(" ");
      console.log("////////// req JSON //////////");
      console.log(req.body);

      const replaceResult = await db.collection(cName).replaceOne({}, req.body);

      client.close();

      res.status(200).send({ message: 'Test bestanden!' });
    });

    // Tests
    //res.status(200).send({ message: 'Test bestanden!' });
    //res.status(200).send({ message: "" });
  });
});
*/
/*
// Appends a new intent
router.post("/corpus", function (req, res) {
  // Mongo Client
  const client = new MongoClient(router.mongoURL, { useUnifiedTopology: true });

  // connect to mongodb
  client.connect(function (err) {
    if (err) throw err;
    //res.json({ Message: "Connection close" });
    // choose db 'corpus"
    const db = client.db(dbName);

    // query collection 'dataC'
    // update intent 'None'
    /*
    db.collection(cName).updateOne(
      {},
      {
        $set: {
          data: {
            intent: "None",
            utterances: [
              "ich brauche rat",
              "ich brauche einen vorschlag",
              "kannst du mir etwas raten?",
              "was sollte ich tun",
            ],
            answers: ["Sorry, Ich verstehe das nicht"],
          },
        },
      },
      function (err, result) {
        if (err) throw err;
        client.close();
        // Return corpus in json format
        res.json(result);
      }
    );
      // push an intent
      db.collection(cName).updateOne(
      {},
      {
        $set: {
          data: {
            intent: "None",
            utterances: [
              "ich brauche rat",
              "ich brauche einen vorschlag",
              "kannst du mir etwas raten?",
              "was sollte ich tun",
            ],
            answers: ["Sorry, Ich verstehe das nicht"],
          },
        },
      },
      function (err, result) {
        if (err) throw err;
        client.close();
        // Return corpus in json format
        res.json(result);
      }
    );

    */
// delete all intent: "None"
/*
db.collection(cName).updateOne(
  {},
  { $pull: { data: { intent: "None" } } },
  function (err, result) {
    if (err) throw err;
    client.close();
    // Return corpus in json format
    res.json(result);
  }
);*/ /*
client.close();
});
});
*/

/*
router.put("/:id", function (req, res) {
  /*
  //Check if all fields are provided and are valid:
  if (
    !req.body.name ||
    !req.body.year.toString().match(/^[0-9]{4}$/g) ||
    !req.body.rating.toString().match(/^[0-9]\.[0-9]$/g) ||
    !req.params.id.toString().match(/^[0-9]{3,}$/g)
  ) {
    res.status(400);
    res.json({ message: "Bad Request" });
  } else {
    //Gets us the index of movie with given id.
    var updateIndex = movies
      .map(function (movie) {
        return movie.id;
      })
      .indexOf(parseInt(req.params.id));

    if (updateIndex === -1) {
      //Movie not found, create new
      movies.push({
        id: req.params.id,
        name: req.body.name,
        year: req.body.year,
        rating: req.body.rating,
      });
      res.json({
        message: "New movie created.",
        location: "/movies/" + req.params.id,
      });
    } else {
      //Update existing movie
      movies[updateIndex] = {
        id: req.params.id,
        name: req.body.name,
        year: req.body.year,
        rating: req.body.rating,
      };
      res.json({
        message: "Movie id " + req.params.id + " updated.",
        location: "/movies/" + req.params.id,
      });
    }
  }*/ /*
});
*/
/*
router.delete("/:id", function (req, res) {
  /*
  let map = movies.map(function (movie) {
    return movie.id;
  });
  const removeIndex = map.indexOf(Number(req.params.id)); //Gets us the index of movie with given id.

  if (removeIndex === -1) {
    res.json({ message: "Not found" });
  } else {
    movies.splice(removeIndex, 1);
    res.send({ message: "Movie id " + req.params.id + " removed." });
  }*/ /*
});
*/
module.exports = router;
