const mongoose = require("mongoose");

require("dotenv").config();

const connectDB = async () => {
  try {
    mongoose.set("strictQuery", true);
    mongoose.connect(process.env.DB_URL);
    console.log("database connected");
  } catch (err) {
    console.error("error while database connecting : " + err);
    process.exit();
  }
};

module.exports = connectDB;
