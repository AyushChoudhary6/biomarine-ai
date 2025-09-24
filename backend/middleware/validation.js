const Joi = require('joi');

const validateUser = (data) => {
    const schema = Joi.object({
        name: Joi.string().required().min(2).max(50),
        email: Joi.string().email().required(),
        phone: Joi.string().optional().min(10).max(15).pattern(/^\+?[\d\s\-\(\)]+$/),
        password: Joi.string().required().min(6),
        country: Joi.string().required(),
        userType: Joi.string().valid('student', 'researcher').required(),
        qualifications: Joi.when('userType', {
            is: 'researcher',
            then: Joi.string().required().min(1),
            otherwise: Joi.forbidden() // Don't allow qualifications for students
        }),
        popularArticle: Joi.when('userType', {
            is: 'researcher',
            then: Joi.string().optional(),
            otherwise: Joi.forbidden()
        }),
        institute: Joi.when('userType', {
            is: 'researcher',
            then: Joi.string().required().min(1),
            otherwise: Joi.forbidden()
        }),
        specialization: Joi.when('userType', {
            is: 'researcher',
            then: Joi.string().optional(),
            otherwise: Joi.forbidden()
        }),
        yearsOfExperience: Joi.when('userType', {
            is: 'researcher',
            then: Joi.number().min(0).optional(),
            otherwise: Joi.forbidden()
        }),
        researchInterests: Joi.when('userType', {
            is: 'researcher',
            then: Joi.array().items(Joi.string()).optional(),
            otherwise: Joi.forbidden()
        })
    });
    return schema.validate(data);
};

// Separate validation for registration (phone required)
const validateRegistration = (data) => {
    const schema = Joi.object({
        name: Joi.string().required().min(2).max(50),
        email: Joi.string().email().required(),
        phone: Joi.string().required().min(10).max(15).pattern(/^\+?[\d\s\-\(\)]+$/),
        password: Joi.string().required().min(6),
        country: Joi.string().required(),
        userType: Joi.string().valid('student', 'researcher').required(),
        qualifications: Joi.when('userType', {
            is: 'researcher',
            then: Joi.string().required().min(1),
            otherwise: Joi.forbidden()
        }),
        popularArticle: Joi.when('userType', {
            is: 'researcher',
            then: Joi.string().optional(),
            otherwise: Joi.forbidden()
        }),
        institute: Joi.when('userType', {
            is: 'researcher',
            then: Joi.string().required().min(1),
            otherwise: Joi.forbidden()
        }),
        specialization: Joi.when('userType', {
            is: 'researcher',
            then: Joi.string().optional(),
            otherwise: Joi.forbidden()
        }),
        yearsOfExperience: Joi.when('userType', {
            is: 'researcher',
            then: Joi.number().min(0).optional(),
            otherwise: Joi.forbidden()
        }),
        researchInterests: Joi.when('userType', {
            is: 'researcher',
            then: Joi.array().items(Joi.string()).optional(),
            otherwise: Joi.forbidden()
        })
    });
    return schema.validate(data);
};

module.exports = {
    validateUser,
    validateRegistration
};