const Joi = require('@hapi/joi');

const userValSchema = Joi.object().keys({
    name: Joi.string()
             .min(1)
             .max(20)
             .required()
             .label('name'),
    species: Joi.string()
             .min(3)
             .max(20)
             .required()
             .label('species'),
    owner: Joi.string()
             .min(20)
             .required()
             .label('owner')
});

module.exports = userValSchema;