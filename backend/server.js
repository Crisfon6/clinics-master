const express = require("express");
const mongoose = require("mongoose");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3001;
    this.connectDB();
    this.routes();
    this.middlewares();
  }

  connectDB() {
    mongoose
      .connect("mongodb://localhost:27017/equiposMedicos", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
      })
      .then(() => console.log("Conexión con MongoDB: ON"))
      .catch((error) => console.log("Error al conectar con MongoDB: " + error));
  }

  middlewares() {
    this.app.use(express.json());
  }

  routes() {
    this.app.use("/api/user");
    // 
  }

  listen() {
    this.app.listen(this.port, () =>
      console.log("Servidor ejecuta en puerto: " + this.port)
    );
  }
}
const server = new Server();
// module.exports = server;
server.listen();
