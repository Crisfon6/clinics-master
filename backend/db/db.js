const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODBURI, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true,
      useUnifiedTopology: true,
    });
    console.log("Conexión con MongoDB: ON");
  } catch (err) {
    console.log("Error al conectar con MongoDB: " + err);
    throw new Error("Error connecting to MongoDB");
  }
};

module.exports = { dbConnection };