const express = require("express");
const mongoose = require("mongoose");

const clinic = require("./routes/clinic");
const inventory = require("./routes/inventory");
const user = require("./routes/user");
const employee = require("./routes/employee");
const role = require("./routes/role");
const auth = require("./routes/login");
const equipment = require("./routes/equipment");

class Server {
    constructor(routes) {
        this.app = express();
        this.middlewares();
        this.routes(routes);
        this.port = process.env.PORT || 3001;
        this.connectDB();
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
    { path: "/api/clinic/", controller: clinic },
    { path: "/api/inventory/", controller: inventory },
    { path: "/api/users/", controller: user },
    { path: "/api/role/", controller: role},
    { path: "/api/emloyee/", controller: employee },
    { path: "/api/auth/", controller: auth},
    { path: "/api/equipment", controller: equipment}
];

const server = new Server(routes);
server.listen();