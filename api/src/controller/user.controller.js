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
    subscribed: { type: Array, required: false },
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


// Watch later--------------------------------------------
exports.postWatchList = async (req, res) => {
  const video = req.body;
  const token = req.headers.authorization.split(" ")[1]; //token is from axios.post in Card.jsx
  const decoded = jwt.verify(token, process.env.JWT_SECRET); //decoding token

  try{
    const user = await User.findById(decoded.id);
   

     // Check if the youtube video is already in watchlater
    if(user.watchlist && user.watchlist.some(watchlist => watchlist.videoId === video.videoId)) {
      return res.status(400).json({ message: 'Video is already in favorites' })
    }

    // Add youtube video to user's watchlist
    user.watchlist = [...user.watchlist, video];
    await user.save();

    return res.status(200).json({ message: 'Video added to favorites' });


  }catch(error){
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
}
exports.postSubscribeList = async (req, res) => {
  console.log(req.body);
  const chanel = req.body;
  const token = req.headers.authorization.split(" ")[1]; //token is from axios.post in Card.jsx
  const decoded = jwt.verify(token, process.env.JWT_SECRET); //decoding token

  try{
    const user = await User.findById(decoded.id);
     // Check if the youtube video is already in watchlater

     if(user.subscribed && user.subscribed.some(subscribed => subscribed.channelID === chanel.channelID)) {

      return res.status(400).json({ message: 'You are already subscribed' })
    }

    // Add youtube video to user's watchlist
    user.subscribed = [...user.subscribed, chanel];
    await user.save();

    return res.status(200).json({ message: 'You are now subscribed' });


  }catch(error){
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

exports.checkWatchList = async (req, res) => {
  const video = req.body;
  const token = req.headers.authorization.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if(user.watchlist && user.watchlist.some(watchlist => watchlist.videoId === video.videoId)) {
      return res.status(200).json({ message: 'Video is already in favorites' })
    }
    return res.status(200).json({ message: 'Video is not in favorites' })
    
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
    
  }
}
exports.checkSubribeList = async (req, res) => {
  const chanel = req.body;
  const token = req.headers.authorization.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if(user.subscribed && user.subscribed.some(subscribed => subscribed.channelID === chanel.chanelID)) {
      return res.status(200).json({ message: 'You are already subscribed' })
    }
    return res.status(200).json({ message: 'You are not subscribed' })
    
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
    
  }
}

exports.getWatchList = async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    return res.status(200).json({ watchlist: user.watchlist });
    
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
    
  }
}


exports.removeWatchList = async (req, res) => {
  const video = req.body;
  const token = req.headers.authorization.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    // Remove youtube video from user's watchlist
    user.watchlist = user.watchlist.filter(watchlist => watchlist.videoId !== video.videoId);
    await user.save();

    return res.status(200).json({ message: 'Video removed from watchlist' });
    
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
    
  }
}




exports.User = User;
