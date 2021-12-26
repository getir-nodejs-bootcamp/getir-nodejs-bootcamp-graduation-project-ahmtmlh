const Mongoose = require("mongoose");

const db = Mongoose.connection;

const uri  = "mongodb+srv://challengeUser:WUMglwNBaydH8Yvu@challenge-xzwqd.mongodb.net/getir-case-study?retryWrites=true"

db.once("open", () => {
  console.log("MongoDB connction successful");
});

const connectDB = async () => {
  await Mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

module.exports = {
  connectDB,
};