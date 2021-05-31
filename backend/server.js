const express = require("express");
const mongoose = require("mongoose");

class Server {
  constructor(routes) {
    this.app = express();
    this.port = process.env.PORT || 3001;
    this.connectDB();
    this.routes(routes);
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

  routes(routes) {
    routes.forEach(route => {
      this.app.use(route.path, route.controller);
    });
    // this.app.use("/api/user");
    // importar rutas
  }

  listen() {
    this.app.listen(this.port, () =>
      console.log("Servidor ejecuta en puerto: " + this.port)
    );
  }
}
routes = [ {path: "api/user" , controller : <"route que trabajaron">} ];
const server = new Server(routes);
// module.exports = server;
server.listen();
