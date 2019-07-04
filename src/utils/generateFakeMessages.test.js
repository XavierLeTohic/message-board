const generateFakeMessages = require('./generateFakeMessages')

describe('generateFakeMessages', () => {
  it('should generate one message with an author and a content as string', () => {
    const messages = generateFakeMessages(1)
    expect(messages.length).toBe(1)
    expect(typeof messages[0].author).toBe('string')
    expect(typeof messages[0].content).toBe('string')
    expect(typeof messages[0].avatar).toBe('string')
  })

  it('should generate two message with an author and a content', () => {
    const messages = generateFakeMessages(2)
    expect(messages.length).toBe(2)
    expect(typeof messages[0].author).toBe('string')
    expect(typeof messages[0].content).toBe('string')
    expect(typeof messages[0].avatar).toBe('string')
    expect(typeof messages[1].author).toBe('string')
    expect(typeof messages[1].content).toBe('string')
    expect(typeof messages[1].avatar).toBe('string')
  })
})
