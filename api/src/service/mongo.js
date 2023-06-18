const mongoose = require("mongoose");
const url = process.env.MONGO_URL;

//connect to monodb
const connectToMongo = async () => {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connection successful");
  } catch (error) {
    console.log("No connection: ", error);
  }
};
module.exports = connectToMongo;
