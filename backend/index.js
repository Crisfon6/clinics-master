
const server = require('./server.js');
const routers = require("./routes/index")

function main() {
   
    server.run(routers);
}

main();