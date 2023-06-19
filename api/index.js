require('dotenv').config();
const express = require("express");
const morgan = require("morgan");
const methodOverride = require("method-override");
const cors = require("cors");
const bodyParser = require("body-parser");

const youtubeRouter = require("./src/routes/youtube.router");

const userRouter = require("./src/routes/user.router");

// Put routes here
const app = express();

app.use(morgan("dev"));
app.use(methodOverride("_method"));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json())

app.get("/", (req, res) => {
  res.send("Hello World!");
});


app.use('/user', userRouter)

app.use("/youtube", youtubeRouter)

app.listen(process.env.PORT, () => {
  console.log(`Example app listening at http://localhost:${process.env.PORT}`);
});
