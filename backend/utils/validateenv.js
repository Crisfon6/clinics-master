const envalid = require('envalid');
const { port, str } = require('envalid');

function validateEnv() {
    envalid.cleanEnv(process.env, {
        PORT: port(),
        MONGODBURI: str()
    });
}
module.exports = validateEnv;