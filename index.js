var express = require("express"),
  app = express(),
  port = 8001,
  mongoose = require("mongoose"),
  users = require("./module/datamodel");

(bodyParser = require("body-parser")),
  //mongoose.Promise = global.Promise;
  // mongoose.connect('mongodb://localhost/'); // live
  mongoose.connect("mongodb://localhost/countrydata"); // local
var path = __dirname;
app.use("/streaming_app/data", express.static(path + "/data"));

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type,Auth_Token"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set("port", port);

const routes = require("./routes/routes");
routes(app);

app.listen(port);
module.exports = app;

console.log(" RESTful API server started on: " + port);
