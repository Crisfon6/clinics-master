//  haveRole('ADMIN_ROLE', 'employ'), comnprobar con esto
const haveRole = (...req) => {
    return (req, res, next) => {
        if (!req.user) {
            return res
                .status(500)
                .send({ msg: "Tu necesitas un token primero para validar tu rol" });
        }
        if (!roles.includes(req.user.role)) {
            return res.status(401).send({
                msg: "Este servicio requiere tener algunos de estos roles : ",
                roles,
            });
        }
        next();
    };
};
module.exports = {
    haveRole,
};