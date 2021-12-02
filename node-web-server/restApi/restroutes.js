// Resouce for writing
// https://www.tutorialspoint.com/expressjs/expressjs_restful_apis.htm

const express = require("express");
const router = express.Router();

router.mongoURL = "mongodb://localhost:27017";
//router.mongoURL = "mongodb://mongodb:27017";

// MongoDb Client Setup
const MongoClient = require("mongodb").MongoClient;
const dbName = "corpus";
const cName = "dataC";

// Rest Router
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
  //res.json("Info");
  //res.status(404); //Set status to 404 as movie was not found
});

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
    );*/
    client.close();
  });
});

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
  }*/
});

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
  }*/
});

module.exports = router;
