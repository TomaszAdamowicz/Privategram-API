const validator = require('validator');

const sanitize = (input) => {

    if(typeof(input) === 'string') {
        const sanitized = validator.escape(input);

        return sanitized;
    } else if(typeof(input) === 'object') {
        const sanitized = input.map(validator.escape);

        return sanitized;
    }

}

module.exports = sanitize;