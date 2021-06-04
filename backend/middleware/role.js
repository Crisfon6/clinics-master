const Role = require("../models/role");

//  haveRole('ADMIN_ROLE', 'employ'), comnprobar con esto


const haveRole = (...role) => {
    return async(req, res, next) => {
        let error= true;
        
        try{
        const roleDB = await Role.findById(req.user.role);
        role.forEach(element=>{
            if(element === roleDB.name) {
                error=false
            }
        })
        if(error === true)return res.status(400).send("You need be "+role)
        next();
    }
    catch(eror){
        res.status(400).send("Error checking role")
    }
    };
};
module.exports = {
    haveRole,
};