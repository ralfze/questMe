const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer();
const cookieParser = require('cookie-parser');

class RestApi {
  // default rest port 3001
  port = 3001;
  constructor() {}
  start() {
    const app = express();

    app.use(cookieParser());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(upload.array());

    //Require the Router we defined in movies.js
    //const movies = require('movies');

    //Use the Router on the sub route /movies
    //app.use('/movies', movies);

    // Start the Rest Server
    app.listen(this.port, () => {
      console.log("Rest Server on Port: " + this.port);
    });
  }
}
module.exports = RestApi;
