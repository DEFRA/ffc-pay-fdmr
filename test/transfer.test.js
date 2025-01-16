const mockTransferFiles = jest.fn()
jest.mock('../app/transfer/transfer-files', () => ({
  transferFiles: mockTransferFiles
}))

const mockConfig = {
  enabled: true,
  pollingInterval: 1000
}
jest.mock('../app/config', () => ({
  transferConfig: mockConfig
}))

describe('transfer', () => {
  let transfer
  let mockSetTimeout

  beforeEach(() => {
    mockSetTimeout = jest.fn()
    global.setTimeout = mockSetTimeout
    jest.useFakeTimers()
    jest.clearAllMocks()
    transfer = require('../app/transfer')
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  test('calls transferFiles when enabled', async () => {
    await transfer.start()
    expect(mockTransferFiles).toHaveBeenCalled()
  })

  test('does not call transferFiles when disabled', async () => {
    mockConfig.enabled = false
    await transfer.start()
    expect(mockTransferFiles).not.toHaveBeenCalled()
  })
})
