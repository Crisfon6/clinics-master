const express = require("express");
const mongoose = require("mongoose");
//esto agregarlo al main






function Server() {

    this.port = process.env.PORT || 3001;
    this.app = express();

    this.run = (routers) => {

        this.middlewares();
        this.routes(routers);
        this.connectDB();
        this.listen();

    }

    this.connectDB = function() {
        const mongodbURI = process.env.MONGODBURI;
        mongoose
            .connect(mongodbURI, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useFindAndModify: false,
                useCreateIndex: true,
            })
            .then(() => console.log("Conexión con MongoDB: ON"))
            .catch((error) => console.log("Error al conectar con MongoDB: " + error));
    }

    this.middlewares = () => {
        this.app.use(express.json());
    }

    this.routes = (routers) => {
        routers.forEach((route) => {
            this.app.use(route.path, route.controller);
        });
    }

    this.listen = () => {
        this.app.listen(this.port, () =>
            console.log("Servidor ejecuta en puerto: " + this.port)
        );
    }
}


const server = new Server();
module.exports = server;