const Joi = require("@hapi/joi")

module.exports.registerValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string()
      .min(6)
      .required(),
    password: Joi.string()
      .min(8)
      .required(),
    repeatPassword: Joi.ref('password'),
    username: Joi.string()
      .min(6)
      .required(),
    email: Joi.string()
      .email()
      .min(6)
      .required(),
  }).with('password', 'repeat_password');
  const {error} = schema.validate(data)
  const messages =  error.details.map(error => error.message)
  return messages.length > 0 ? messages : null
}