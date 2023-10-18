const Joi = require('joi')

const schema = Joi.object({
  pollingInterval: Joi.number().integer().default(60000), // 10 seconds
  pollingActive: Joi.boolean().default(true)
})

const config = {
  pollingInterval: process.env.POLLING_INTERVAL,
  pollingActive: process.env.POLLING_ACTIVE
}

const result = schema.validate(config, {
  abortEarly: false
})

if (result.error) {
  throw new Error(`The transfer config is invalid. ${result.error.message}`)
}

module.exports = result.value
