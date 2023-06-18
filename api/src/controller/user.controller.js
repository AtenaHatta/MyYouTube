const mongoose = require("mongoose");
const connectToMongo = require("../service/mongo");
connectToMongo();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");


//schema
const newSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
    watchlist: { type: Array, required: false },
  },
  { collection: "users" }
);

const User = mongoose.model("users", newSchema); //mongodb data


//Sign up, Create a new user --------------------------------------------
exports.postUser = async (req, res) => {
    const { email, password } = req.body; //req.body is Signup.jsx's axios.post's data
    
    //Check if user already exists
    try {
        const exsits = await User.findOne({ email });
    if (exsits) {
      return res.status(400).json({ message: "User already exists" });
    }

    //Hash password
    const hiddenPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      email,
      password : hiddenPassword, //password is hidden
    });

    await newUser.save(); //save to mongodb
    res.status(200).json({ message: "User created successfully" });
  } 
  catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//Sign in --------------------------------------------
exports.getUser = async (req, res) => {
    const { email, password } = req.body;

    //Check if user already exists
    try{
      const user = await User.findOne({ email }); //User is mongodb data
        if (!user) {
            return res.status(400).json({ message: "User does not exist" });
        }
        //Compare password, if not match, return error
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        //hide id(mongodb)
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        res.status(200).json({ user: token });

    }
    catch(error){
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}
