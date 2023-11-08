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


// Sign up
exports.postUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const exsits = await User.findOne({ email });
    if (exsits) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hiddenPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      email,
      password: hiddenPassword,
    });

    await newUser.save();
    res.status(200).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};


// Sign in 
exports.getUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.status(200).json({ user: token, token: token });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};


exports.postSubscribeList = async (req, res) => {
  const chanel = req.body;
  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  try {
    const user = await User.findById(decoded.id);
    if (
      user.subscribed &&
      user.subscribed.some(
        (subscribed) => subscribed.channelID === chanel.channelID
      )
    ) {
      return res.status(400).json({ message: "You are already subscribed" });
    }

    user.subscribed = [...user.subscribed, chanel];
    await user.save();

    return res.status(200).json({ message: "You are now subscribed" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.removeFromSubscribeList = async (req, res) => {
  const chanel = req.body;
  const token = req.headers.authorization.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    user.subscribed = user.subscribed.filter(
      (subscribed) => subscribed.channelID !== chanel.channelID
    );
    await user.save();

    return res.status(200).json({ message: "You are now unsubscribed" });
  } catch (error) {res.status(500).json({ message: "Internal server error" });
  }
};


exports.postWatchList = async (req, res) => {
  const video = req.body;
  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  try {
    const user = await User.findById(decoded.id);
    if (
      user.watchlist &&
      user.watchlist.some((watchlist) => watchlist.videoId === video.videoId)
    ) {
      return res.status(400).json({ message: "Video is already in favorites" });
    }

    user.watchlist = [...user.watchlist, video];
    await user.save();

    return res.status(200).json({ message: "Video added to favorites" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.checkSubribeList = async (req, res) => {
  const chanel = req.body;
  const token = req.headers.authorization.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (
      user.subscribed &&
      user.subscribed.some(
        (subscribed) => subscribed.channelID === chanel.chanelID
      )
    ) {
      return res.status(200).json({ message: "You are already subscribed" });
    }
    return res.status(200).json({ message: "You are not subscribed" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.removeWatchList = async (req, res) => {
  const video = req.body;
  const token = req.headers.authorization.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    user.watchlist = user.watchlist.filter(
      (watchlist) => watchlist.videoId !== video.videoId
    );
    await user.save();

    return res.status(200).json({ message: "Video removed from watchlist" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.checkWatchList = async (req, res) => {
  const video = req.body;
  const token = req.headers.authorization.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (
      user.watchlist &&
      user.watchlist.some((watchlist) => watchlist.videoId === video.videoId)
    ) {
      return res.status(200).json({ message: "Video is already in favorites" });
    }
    return res.status(200).json({ message: "Video is not in favorites" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getWatchList = async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    return res.status(200).json({ watchlist: user.watchlist });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.User = User;
