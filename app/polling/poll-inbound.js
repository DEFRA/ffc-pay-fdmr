const storage = require('../storage')

const pollInbound = async () => {
  const paymentFiles = await storage.getPendingPaymentFiles()
  for (const paymentFile of paymentFiles) {
    try {
      // transfer FDMR files to blob storage
    } catch (err) {
      console.error(err)
    }
  }
}

module.exports = pollInbound
