const joi = require("joi")
const { joiPasswordExtendCore } = require('joi-password');
const joiPassword = joi.extend(joiPasswordExtendCore);


const schema = { 
    userSchemaVal :
    joi.object ({
        name : joi.string().max(25).min(3).required(),
        email : joi.string().email().required(),
        password: joiPassword
        .string()
        .minOfSpecialCharacters(1)
        .minOfLowercase(1)
        .minOfUppercase(1)
        .minOfNumeric(1)
        .noWhiteSpaces()
        .required(),
        number : joi.number().required()

    }).unknown(true),
    
    
    userLoginSch :
    joi.object ({
        email : joi.string().email().required(),
        password: joi.string().required(),

    }).unknown(true),    
}

module.exports = schema