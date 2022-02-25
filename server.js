const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const md5 = require("md5");
const app = express();
const port = 443;
const fs = require('fs')

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
    md5(req.body.password) == "5f4dcc3b5aa765d61d8327deb882cf99"
  ) {
    res.send("Welcome!");
  } else {
    res.send("Get Thee Hence!");
  }
});
