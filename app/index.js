require('./insights').setup()
require('log-timestamp')
const polling = require('./transfer')

module.exports = (async () => polling.start())()
