const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const app = express();
const router = require("./router");
const mongoose = require("mongoose");

mongoose.connect(
  "mongodb://bobbytest:Bobbytest1@ds163781.mlab.com:63781/express-server-skeleton",
  { useNewUrlParser: true }
);

// App setup
app.use(morgan("combined"));
app.use(bodyParser.json({ type: "*/*" }));
router(app);

// Server Setup
const port = process.env.PORT || 8000;
const server = http.createServer(app);
server.listen(port);
console.log("Listing to port", port);
