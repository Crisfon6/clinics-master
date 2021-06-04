const Role = require("../models/role");

//  haveRole('ADMIN_ROLE', 'employ'), comnprobar con esto


const haveRole = (role) => {
    return async(req, res, next) => {
      
        
        const roleDB = await Role.findById(req.user.role);

        if (role !== roleDB.name) {
            return res.status(400).send("You need be "+role)
        }
        next();
    };
};
module.exports = {
    haveRole,
};