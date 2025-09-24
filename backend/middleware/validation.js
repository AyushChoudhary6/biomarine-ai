const Joi = require('joi');

const validateUser = (data) => {
    const schema = Joi.object({
        name: Joi.string().required().min(2).max(50),
        email: Joi.string().email().required(),
        phone: Joi.string().required().min(10).max(15),
        password: Joi.string().required().min(6),
        country: Joi.string().required(),
        userType: Joi.string().valid('student', 'researcher').required(),
        qualifications: Joi.when('userType', {
            is: 'researcher',
            then: Joi.string().required(),
            otherwise: Joi.string().optional()
        }),
        popularArticle: Joi.string().optional(),
        institute: Joi.when('userType', {
            is: 'researcher',
            then: Joi.string().required(),
            otherwise: Joi.string().optional()
        }),
        specialization: Joi.string().optional(),
        yearsOfExperience: Joi.number().optional(),
        researchInterests: Joi.array().items(Joi.string()).optional()
    });
    return schema.validate(data);
};

module.exports = {
    validateUser
};