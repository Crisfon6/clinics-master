//  haveRole('ADMIN_ROLE', 'SELLER_ROLE'), comnprobar con esto
const haveRole = (...roles) => {

    return (req, req, next) => {
        if (!req.user) {
            return res.status(500).send({ msg: 'Tu necesitas un token primero para validar tu rol' });
        }
        if (!roles.includes(req.user.role)) {
            return res.status(401).send({ msg: 'Este servicio requiere tener algunos de estos roles : ', roles });
        }
        next();
    }
}
module.exports = {
    haveRole
}