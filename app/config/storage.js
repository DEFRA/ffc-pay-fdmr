const Joi = require('joi')

const schema = Joi.object({
  enabled: Joi.boolean().default(true),
  connectionStr: Joi.string().when('useConnectionStr', { is: true, then: Joi.required(), otherwise: Joi.allow('').optional() }),
  storageAccount: Joi.string().required(),
  useConnectionStr: Joi.boolean().default(false),
  createContainers: Joi.boolean().default(false),
  container: Joi.string().required(),
  inboundFolder: Joi.string().required(),
  shareConnectionString: Joi.string().required(),
  shareName: Joi.string().required(),
  fdmrFolder: Joi.string().required(),
  managedIdentityClientId: Joi.string().optional()

})

const config = {
  enabled: process.env.ENABLED,
  connectionStr: process.env.AZURE_STORAGE_CONNECTION_STRING,
  storageAccount: process.env.AZURE_STORAGE_ACCOUNT_NAME,
  useConnectionStr: process.env.AZURE_STORAGE_USE_CONNECTION_STRING,
  createContainers: process.env.AZURE_STORAGE_CREATE_CONTAINERS,
  container: 'batch',
  inboundFolder: 'inbound',
  shareConnectionString: process.env.FDMR_STORAGE_CONNECTION_STRING,
  shareName: process.env.FDMR_STORAGE_SHARE_NAME,
  fdmrFolder: process.env.FDMR_STORAGE_FOLDER_NAME,
  managedIdentityClientId: process.env.AZURE_CLIENT_ID

}

const result = schema.validate(config, {
  abortEarly: false
})

if (result.error) {
  throw new Error(`The storage config is invalid. ${result.error.message}`)
}

module.exports = result.value
