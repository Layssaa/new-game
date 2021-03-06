//------------- HTTPS ----------------
require("dotenv").config();
const https = require("https");
const fs = require("fs");
const path = require("path");
const express = require("express");
const WebSocket = require("ws");
const wsServer = require("./routers/index");

const app = express();
app.use(express.static("dist"));

app.get("/", (req, res, next) => {
  const options = {
    root: path.join(__dirname, "..", "dist"),
  };

  res.sendFile("index.html", options, (err) => {
    if (err) {
      next(err);
    } else {
      next();
    }
  });
});

const server = https.createServer(
  {
    cert: fs.readFileSync(path.join(__dirname, "certs", "mycert.crt")),
    key: fs.readFileSync(path.join(__dirname, "certs", "selfsigned.key")),
  },
  app
);

server.on("error", (err) => console.error(err));

const wss = new WebSocket.Server({ server, path: "/" });

wsServer(wss, WebSocket);

module.exports = { server, wss };
