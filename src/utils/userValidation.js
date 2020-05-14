const Joi = require('@hapi/joi');

const userValSchema = Joi.object().keys({
    name: Joi.string()
             .min(3)
             .max(20)
             .required()
             .label('name'),
    surname: Joi.string()
             .min(1)
             .max(20)
             .required()
             .label('surname'),
    login: Joi.string()
              .alphanum()
              .min(5)
              .max(20)
              .required()
              .label('login'),
    password: Joi.string()
                 .required()
                 .label('password'),
    phone: Joi.string()
              .required()
              .min(11)
              .max(12)
              .pattern(new RegExp(/^(375|80)(25|29|33|44)([1-9])(\d{6})$/s)).error(new Error('Invalid phone number'))
              .label('phone'),
    email: Joi.string()
              .email()
              .required()
              .label('email')
});

module.exports = userValSchema;