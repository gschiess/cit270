const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const md5 = require("md5");
const app = express();
const port = 4443;
const fs = require("fs");
let loginAttempts = 0;

app.use(express.static("public"));

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello HTTPS!");
});

https
  .createServer(
    {
      key: fs.readFileSync("server.key"),
      passphrase: "P@ssw0rd",
      cert: fs.readFileSync("server.cert"),
    },
    app
  )
  .listen(port, () => {
    console.log("Listening...");
  });

app.post("/login", (req, res) => {
  console.log(JSON.stringify(req.body));
  if (loginAttempts <= 5) {
    if (
      req.body.userName == "gabeschiess@gmail.com" &&
      md5(req.body.password) == "5d9d8d9b34463537eb359877ca5cdf78"
    ) {
      res.send("Welcome!");
    } else {
      ++loginAttempts;
      console.log(loginAttempts + " Invalid Login Attempt('s)");
      res.status(401); //Unathorized
      res.send("Get Thee Hence!");
    }
  } else {
    res.status(401); //Unathorized
    res.send("You don Broke it you dingus");
  }
});
