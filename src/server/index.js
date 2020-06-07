const express = require("express");

import firebase from "../firebase";
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
var blockedEmailList = [];
var sentEmailList = [];
var queuedEmailList = [];

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

app.get("/users/:id/emailqueue", (req, res) => {
  return res.send(queuedEmailList);
});

app.get("/users/:id/sentemails", (req, res) => {
  res.send(sentEmailList);
});
app.post("/users/:id/sentemails/", (req, res) => {
  var sentemails = req.body.newFormFill;
  sentEmailList.unshift(sentemails);
  firebase.db
    .collection("mail")
    .add({
      to: "jayblar@gmail.com",
      message: {
        subject: "New Contact Form",
        text: "",
        html: `email: ${req.body.newFormFill.email} message: ${req.body.newFormFill.message}`,
      },
      user: req.params.id,
    })
    .then(() => console.log("Queued email for delivery!"));

  return res.send("email list updated");
});

app.get("/users/:id/blockedemails", (req, res) => {
  res.send(blockedEmailList);
});

app.post("/users/:id/blockedemails", (req, res) => {
  var blockedEmail = req.body.newFormFill;
  blockedEmailList.unshift(blockedEmail);
  firebase.db
    .collection("blockedmail")
    .doc("bjWKTCQOWxRP3NEpRvmY6TC0Lv02")
    .set({
      to: "jayblar@gmail.com",
      message: {
        subject: "New Contact Form",
        text: "",
        html: `email: ${req.body.newFormFill.email} message: ${req.body.newFormFill.message}`,
      },
    })
    .then(() => console.log("email added to blocked list"));
  console.log(blockedEmailList);
  return res.send("blocked email list updated");
});

app.get("/users/:id/sendanyway", (req, res) => {
  res.send("Email has been sent anyway");
});

app.post("/users/:id/sendanyway", (req, res) => {
  const toEmail = req.body.emailToSend;
  const message = req.body.messageToSend;
  firebase.db
    .collection("mail")
    .add({
      to: "jayblar@gmail.com",
      message: {
        subject: "New Contact Form",
        text: "",
        html: `email: ${toEmail} message: ${message}`,
      },
      user: req.params.id,
    })
    .then(() => console.log("Queued email for delivery!"));
});

app.listen(81, () => {
  console.log("Server is listening!");
});
