const User = require('../api/models/userModel');

const checkAdmin = async (req, res, next) => {
    const user = await User.findById(res.locals.id);

    if(user.role === "Admin"){
        next();
    } else {
        res.status(403)
    }
}

module.exports = checkAdmin;