const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors"); // Import the cors package

const app = express();

// Use CORS middleware
app.use(cors());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "public")));

// Headers for info for the user
app.use((req, res, next) => {
  const originalEnd = res.end;

  res.end = function (...args) {
    // will send status code before it sends out the headers
    res.setHeader("X-API-Status-Code", res.statusCode);
    originalEnd.apply(this, args);
  };

  res.setHeader("X-Licensed-By", "Crypton Future Media");
  res.setHeader("X-API-Version", "1.0");
  res.setHeader("X-API-Status", "Operational");
  res.setHeader("X-Leah-Status", "Meow :3");
  next();
});

// Read JSON files
const items145 = JSON.parse(
  fs.readFileSync(path.join(__dirname, "145/items/item.json"), "utf-8")
);
const bosses145 = JSON.parse(
  fs.readFileSync(path.join(__dirname, "145/bosses/boss.json"), "utf-8")
);

app.get("/", (req, res) => {
  res.send("up and running!");
});

// Get json files
app.get("/145/bosses", (req, res) => {
  res.json(bosses145);
});

app.get("/145/items", (req, res) => {
  res.json(items145);
});

// Get json files

// Initialize server
app.listen(8001, () => {
  console.log("Running on port 8001.");
});

module.exports = app;
