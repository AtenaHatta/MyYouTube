require('dotenv').config();
const express = require("express");
const morgan = require("morgan");
const methodOverride = require("method-override");
const cors = require("cors");
const bodyParser = require("body-parser");

// Put routes here

const app = express();

app.use(morgan("dev"));
app.use(methodOverride("_method"));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const port = process.env.PORT || 8000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
