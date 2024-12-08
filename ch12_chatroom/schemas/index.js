const mongoose = require("mongoose");

const connect = async () => {
  try {
    if (process.env.NODE_ENV !== "production") {
      mongoose.set("debug", true);
    }
    await mongoose.connect(
      `mongodb://${process.env.MONGO_ID}:${process.env.MONGO_PASSWORD}@localhost:27017/`,
      {
        dbName: process.env.MONGO_DB,
      }
    );
    console.log("Connect DB");
  } catch (error) {
    console.log("Connect Error: ", error);
  }
};

mongoose.connection.on("error", (error) => {
  console.error("Connect Error: ", error);
});
mongoose.connection.on("disconnected", () => {
  console.error("Disconnect DB. reconnect DB");
  connect();
});

module.exports = connect;
