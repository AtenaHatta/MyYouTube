const axios = require("axios");
const jwt = require("jsonwebtoken");
const { User } = require("./user.controller");

exports.getVideoByName = async (req, res) => {
  const { inputvalue } = req.params;
  const apikey = process.env.YOUTUBE_APIKEY;
  let url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${inputvalue}&key=${apikey}`;

  try {
    const response = await axios.get(url);
    console.log(response.data);

    return res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getChanelById = async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  console.log(decoded);

  const apikey = process.env.YOUTUBE_APIKEY;

  try {
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const subscribedChannels = user.subscribed;

    let channelDataArray = [];

    for (let channel of subscribedChannels) {
      const url = `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${channel.channelID}&key=${apikey}`;

      const response = await axios.get(url);
      if (
        response.status === 200 &&
        response.data.items &&
        response.data.items.length > 0
      ) {
        channelDataArray.push(response.data.items[0]);
      }
    }

    return res.status(200).json(channelDataArray);
  } catch (error) {
    console.error("Error fetching channel data:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
