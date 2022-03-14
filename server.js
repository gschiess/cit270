const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const md5 = require("md5");
const app = express();
const port = 4443;
const fs = require('fs');

app.use(express.static('public'));

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello HTTPS!");
});

https
  .createServer(
    {
      key: fs.readFileSync("server.key"),
      passphrase: ("P@ssw0rd"),
      cert: fs.readFileSync("server.cert"),
    },
    app
  )
  .listen(port, () => {
    console.log("Listening...");
  });

app.post("/login", (req, res) => {
  console.log(JSON.stringify(req.body));
  if (
    req.body.userName == "gabrielschiess" &&
    md5(req.body.password) == "5d9d8d9b34463537eb359877ca5cdf78"
  ) {
    res.send("Welcome!");
  } else {
    res.status(401); //Unathorized
    res.send("Get Thee Hence!");
  }
});
