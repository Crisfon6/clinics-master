const express = require("express");
const mongoose = require("mongoose");

const clinic = require("./routes/clinic");
const inventory = require("./routes/inventory");
const user = require("./routes/user");
const employee = require("./routes/employee");

class Server {
    constructor(routes) {
        this.app = express();
        this.port = process.env.PORT || 3001;

        this.routes(routes);
        this.middlewares();
        //this.connectDB();
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
        routes.forEach((route) => {
            this.app.use(route.path, route.controller);
        });
    }

    listen() {
        this.app.listen(this.port, () =>
            console.log("Servidor ejecuta en puerto: " + this.port)
        );
    }
}
routes = [
    { path: "/api/clinic", controller: clinic },
    { path: "/api/inventory", controller: inventory },
    { path: "/api/users", controller: user },
    { path: "/api/emloyee", controller: employee },
];
const server = new Server(routes);
// module.exports = server;
server.listen();
server.connectDB();