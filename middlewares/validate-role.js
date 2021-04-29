const { response } = require("express")

// Validar que sólo el administrador pueda eliminar usuarios
const validateRolAdmin = (req, res=response, next)=>{
    if(!req.user) return res.status(500).json({
        msg: "User token has not been validated"
    });
    const { role } = req.user;

    if(role !='ADMIN_ROLE') return res.status(401).json({
        msg: "You do not have permissions to remove the user"
    });
    next();
}

const hasRole = (...roles)=>{
    return (req, res, next)=>{
        if(!roles.includes(req.user.role)){
            return res.status(401).json({
                msg: "You do not have permissions to remove the user"
            });
        }
        next();
    };
}


module.exports = {
    validateRolAdmin,
    hasRole
}