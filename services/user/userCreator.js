const sanitize = require('../../utils/sanitize');

const createUser = (req) => {
    const {username, password, email, role} = req.body;

    const user = {
        name: sanitize(username),
        password: password,
        email: email,
        role: role
    }

    if (role === undefined) delete newUser['role'];

    return user;
}

module.exports = createUser;