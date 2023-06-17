require('dotenv').config();
const express = require("express");
const morgan = require("morgan");
const methodOverride = require("method-override");
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require('bcrypt');
// const User = require('./models/User');
const collection = require('./src/service/mongo');

const youtubeRouter = require("./src/routes/youtube.router");

const userRouter = require("./src/routes/user.router");

// Put routes here
const app = express();

app.use(morgan("dev"));
app.use(methodOverride("_method"));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json())


// Sign in youtube tutorial------------------------------------------------
// app.get('/',cors(), (req, res) => {

// })


app.get("/", (req, res) => {
  res.send("Hello World!");
});


app.use('/user', userRouter)














// app.post('/',cors(), async (req, res) => {
//    const { email, password } = req.body;

//    try{
//     const check = await collection.findOne({email: email})

//     if(check){
//       res.json({message: "User already exists"})
//     }else{
//       res.json({message: "not exists"})
//     }

//    }catch(e){
//     res.json({message: "not exists"})
//    }
// })


// ------------------------------------------------




// app.use("/youtube", youtubeRouter)

app.listen(process.env.PORT, () => {
  console.log(`Example app listening at http://localhost:${process.env.PORT}`);
});
