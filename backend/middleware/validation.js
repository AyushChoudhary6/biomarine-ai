const Joi = require('joi');

const validateUser = (data) => {
    const schema = Joi.object({
        name: Joi.string().required().min(2).max(50),
        email: Joi.string().email().required(),
        password: Joi.string().required().min(6),
        userType: Joi.string().valid('student', 'researcher').required()
    });
    return schema.validate(data);
};

module.exports = {
    validateUser
};