const server = require('./server.js');
const routers = require("./routes/index");
const dotenv = require("dotenv");
const {dbConnection } = require("./db/db")
const validateEnv = require('./utils/validateenv');
dotenv.config();
validateEnv();

function main() {

    server.run(routers);
    dbConnection();
}

main();