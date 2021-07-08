let joi = require('joi')


const usersValidation = data => {
    const schema = joi.object({
        name: joi.string().required().min(4),
        email: joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
        password: joi.string().required(),
        role: joi.string().optional()
    });
    return schema.validate(data)

}

const loginValidation = data => {
    const schema = joi.object({
        email: joi.string().required().email().min(6).max(255),
        password: joi.string().required(),
    });
    return schema.validate(data)
}




module.exports.usersValidation = usersValidation;
module.exports.loginValidation = loginValidation;