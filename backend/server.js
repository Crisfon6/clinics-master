const express = require("express");
const cors = require("cors");

function Server() {
  this.app = express();

  this.run = (routers) => {
    this.middlewares();
    this.routes(routers);
    this.listen();
  };

  this.middlewares = () => {
    this.app.use(express.json());
    this.app.use(cors());
  };

  this.routes = (routers) => {
    routers.forEach((route) => {
      this.app.use(route.path, route.controller);
    });
  };

  this.listen = () => {
    this.app.listen(process.env.PORT, () =>
      console.log("Servidor ejecuta en puerto: " + process.env.PORT)
    );
  };
}

const server = new Server();
module.exports = server;
