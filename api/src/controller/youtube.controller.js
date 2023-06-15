const axios = require('axios');

exports.getVideoByName = async (req, res) => {
    const { inputvalue } = req.params;

    
 
    const apikey = process.env.YOUTUBE_APIKEY;
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${inputvalue}&key=${apikey}`;

    try {
        const response = await axios.get(url);
         res.status(200).json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}