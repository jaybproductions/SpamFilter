const express = require("express");

const app = express();
const cors = require("cors");
const http = require("http");
const bodyparser = require("body-parser");
const axios = require("axios");
app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

var keywords = [];
var users = [];

app.get("/", (req, res) => {
  return res.send("Server is running");
});

app.get("/users", (req, res) => {
  return res.send(users);
});

app.post("/users", (req, res) => {
  var userInfo = req.body;
  users.unshift(userInfo);
  return res.send("Server is running");
});

app.get("/users/:id/keywords", (req, res) => {
  return res.send(keywords);
});

app.post("/users/:id/keywords", (req, res) => {
  var keywordlist = req.body;
  keywords.unshift(keywordlist);

  return res.send("keyword list updated");
});

app.get("/users/:id/emails", (req, res) => {
  return res.send(keywords);
});

app.post("/users/:id/emails", (req, res) => {
  var emailList = req.body;
  keywords.unshift(emailList);

  return res.send("email list updated");
});

app.listen(81, () => {
  console.log("Server is listening!");
});
