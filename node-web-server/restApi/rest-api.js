const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const upload = multer();
const cookieParser = require("cookie-parser");
const cors = require("cors");

var session = require("express-session");
var memoryStore = new session.MemoryStore();
const keycloak = require("./keycloak-config").initKeycloak();

class RestApi {
  // default rest port 3001
  port = 3001;
  nlp = undefined;
  mongoURL = "mongodb://localhost:27017";
  angularURL = "http://localhost:4200";

  // CORS settings
  corsOptions = {
    origin: this.angularURL,
    methods: ["PUT", "GET", "POST", "DELETE", "OPTIONS"],
  };

  constructor(mongoURL, nlp) {
    this.mongoURL = mongoURL;
    // The Bot
    this.nlp = nlp;
  }
  start() {
    const app = express();

    app.use(cookieParser());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(upload.array());
    app.use(
      session({
        secret: "any_key",
        resave: false,
        saveUninitialized: true,
        store: memoryStore,
      })
    );
    app.use(keycloak.middleware());

    //Require the Router we defined in movies.js
    const Router = require("./restroutes");

    // Router define mongo/angular Address
    Router.mongoURL = this.mongoURL;
    Router.angularURL = this.angularURL;

    // Add Bot to Router
    Router.nlp = this.nlp;

    // Cors for Angular App
    app.use(cors(this.corsOptions));

    //Use the Router on the sub route /restapi
    app.use("/restapi", Router);

    // Start the Rest Server
    app.listen(this.port, () => {
      console.log("Rest Server on Port: " + this.port);
    });
  }
}
module.exports = RestApi;
