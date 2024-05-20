const { start } = require('../../../app/transfer')
const { transferConfig } = require('../../../app/config')
const transferFiles = require('../../../app/transfer/transfer-files')

jest.mock('../../../app/config', () => ({
  transferConfig: {
    enabled: true,
    pollingInterval: 1000
  }
}))

jest.mock('../../../app/transfer/transfer-files', () => jest.fn())

jest.spyOn(global, 'setTimeout')

describe('start function', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should not call transferFiles when transferConfig.enabled is false', async () => {
    transferConfig.enabled = false
    await start()
    expect(transferFiles).not.toHaveBeenCalled()
  })

  test('should call start again after pollingInterval when transferFiles is successful', async () => {
    await start()
    expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), transferConfig.pollingInterval)
  })

  test('should call start again after pollingInterval when transferFiles throws an error', async () => {
    transferFiles.mockImplementationOnce(() => {
      throw new Error('Transfer failed')
    })
    await start()
    expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), transferConfig.pollingInterval)
  })
})
