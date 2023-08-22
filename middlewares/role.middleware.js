const { ROLE_OF_USERS } = require("../constants");

module.exports.isAdmin = (req, res, next) => {
    if (req.user.role === ROLE_OF_USERS[0] || req.user.role === ROLE_OF_USERS[1]) {
        next();
    } else {
        console.log("No tienes permisos para acceder a esta página");
        res.redirect("/");
    }
    }