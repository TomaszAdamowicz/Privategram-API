const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const salt = require('../../config/jwt');

const checkPass = (user, password) => {
    const pass1 = user.password;
    const pass2 = password;

    return bcrypt.compare(pass2, pass1)
            .then((res) => {
                if(res) {
                    const payload = {
                        user: user._id
                    }

                    const token = jwt.sign(payload, salt(), {
                        expiresIn: '96h'
                    })

                    payload.token = token,
                    payload.message = 'User logged in',
                    payload.role = user.role,
                    payload.success = true

                    return payload;
                } else {
                    return null;
                }
            })
}

const userLogin = (user, password) => {
    const authResult = checkPass(user, password);

    return authResult;
}

module.exports = userLogin;