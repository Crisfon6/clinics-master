const clinic = require("./clinic");
const inventory = require("./inventory");
const user = require("./user");
const employee = require("./employee");
const role = require("./role");
const auth = require("./login");
const history = require("./history");
const equipment = require('./equipment');
const uploads = require('./uploads');

const routers = [
    { path: "/api/clinic/", controller: clinic },
    { path: "/api/inventory/", controller: inventory },
    { path: "/api/users/", controller: user },
    { path: "/api/role/", controller: role },
    { path: "/api/employee/", controller: employee },
    { path: "/api/auth/", controller: auth },
    { path: "/api/equipment/", controller: equipment },
    { path: "/api/history/", controller: history },
    { path: "/api/uploads/", controller: uploads },
];

module.exports = routers;